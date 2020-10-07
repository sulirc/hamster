/**
 * Reference Doc: https://github.com/getify/TNG-Hooks/blob/master/src/tng-hooks.src.js
 */

type StateSlot = [any, Function];
type Effect = [Function, any[]];

interface IBucket {
  nextStateSlotIdx: number;
  nextEffectIdx: number;
  nextMemoizationIdx: number;
  stateSlots: StateSlot[];
  effects: Effect[];
  cleanups: Function[];
  memoizations: any[];
}

const buckets = new WeakMap<Function, IBucket>();
const runtimeStack: Function[] = [];

function getCurrentBucket() {
  if (runtimeStack.length > 0) {
    let bucket: IBucket;
    const func = runtimeStack[runtimeStack.length - 1];

    if (!buckets.has(func)) {
      bucket = {
        nextStateSlotIdx: 0,
        nextEffectIdx: 0,
        nextMemoizationIdx: 0,
        stateSlots: [],
        effects: [],
        cleanups: [],
        memoizations: [],
      };
      buckets.set(func, bucket);
    }
    return buckets.get(func);
  }
  return null;
}

export function createHC(func: Function) {
  function HOF(...args: any) {
    runtimeStack.push(func);

    const bucket = getCurrentBucket();

    bucket.nextStateSlotIdx = 0;
    bucket.nextEffectIdx = 0;
    bucket.nextMemoizationIdx = 0;

    try {
      return func.apply(this, args);
    } finally {
      try {
        runEffects(bucket);
      } finally {
        runtimeStack.pop();
      }
    }

    function runEffects(bucket: IBucket) {
      for (let [idx, [effect, guards]] of bucket.effects.entries()) {
        try {
          if (typeof effect === 'function') {
            effect();
          }
        } finally {
          bucket.effects[idx][0] = undefined;
        }
      }
    }
  }

  return HOF;
}

export function useState(initialVal: any) {
  const bucket = getCurrentBucket();

  if (!bucket) {
    throw new Error(
      'useState() only valid inside an Articulated Function or a Custom Hook.'
    );
  }

  return useReducer(function reducer(preVal: any, vOrFn: any) {
    return typeof vOrFn == 'function' ? vOrFn(preVal) : vOrFn;
  }, initialVal);
}

export function useReducer(
  reducerFn: Function,
  initialVal: any,
  ...initialReduction: any
) {
  const bucket = getCurrentBucket();

  if (!bucket) {
    throw new Error(
      'useReducer() only valid inside an Articulated Function or a Custom Hook.'
    );
  }

  if (!(bucket.nextStateSlotIdx in bucket.stateSlots)) {
    const slot: StateSlot = [
      typeof initialVal == 'function' ? initialVal() : initialVal,
      function updateSlot(v: unknown) {
        slot[0] = reducerFn(slot[0], v);
      },
    ];
    bucket.stateSlots[bucket.nextStateSlotIdx] = slot;

    if (initialReduction.length > 0) {
      bucket.stateSlots[bucket.nextStateSlotIdx][1](initialReduction[0]);
    }
  }

  return [...bucket.stateSlots[bucket.nextStateSlotIdx++]];
}

export function useEffect(func: Function, guards?: Array<any>) {
  const bucket = getCurrentBucket();

  if (!bucket) {
    throw new Error(
      'useEffect() only valid inside an Articulated Function or a Custom Hook.'
    );
  }

  if (!(bucket.nextEffectIdx in bucket.effects)) {
    bucket.effects[bucket.nextEffectIdx] = [undefined, undefined];
  }

  const effectIdx = bucket.nextEffectIdx;
  const effect = bucket.effects[effectIdx];

  if (guardsChanged(effect[1], guards)) {
    effect[0] = function effect() {
      if (typeof bucket.cleanups[effectIdx] === 'function') {
        try {
          bucket.cleanups[effectIdx]();
        } finally {
          bucket.cleanups[effectIdx] = undefined;
        }
      }

      const ret = func();

      if (typeof ret === 'function') {
        bucket.cleanups[effectIdx] = ret;
      }
    };
    effect[1] = guards;
  }
}

export function useMemo(func: Function, guards?: Array<any>) {
  let realGuards: Array<any>;

  if (guards && guards.length > 0) {
    realGuards = guards;
  } else {
    realGuards = [func];
  }

  const bucket = getCurrentBucket();

  if (!bucket) {
    throw new Error(
      'useMemo() only valid inside an Articulated Function or a Custom Hook.'
    );
  }

  if (!(bucket.nextMemoizationIdx in bucket.memoizations)) {
    bucket.memoizations[bucket.nextMemoizationIdx] = [];
  }

  const memoization = bucket.memoizations[bucket.nextMemoizationIdx];

  if (guardsChanged(memoization[1], realGuards)) {
    try {
      memoization[0] = func();
    } finally {
      memoization[1] = realGuards;
    }
  }

  bucket.nextMemoizationIdx++;

  return memoization[0];
}

export function useCallback() {}

export function useRef() {}

function guardsChanged(guards1: any, guards2: any): boolean {
  if (guards1 === undefined || guards2 === undefined) {
    return true;
  }

  if (guards1.length !== guards2.length) {
    return true;
  }

  for (let [idx, guard] of guards1.entries()) {
    if (!Object.is(guard, guards2[idx])) {
      return true;
    }
  }

  return false;
}
