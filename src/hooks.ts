/**
 * Reference Doc: https://github.com/getify/TNG-Hooks/blob/master/src/tng-hooks.src.js
 */

type StateSlot = [any, Function];

interface IBucket {
  nextStateSlotIdx: number;
  nextEffectIdx: number;
  nextMemoizationIdx: number;
  stateSlots: StateSlot[];
  effects: Function[];
  cleanups: Function[];
  memoizations: Function[];
}

const buckets = new WeakMap<Function, IBucket>();
const stack: Function[] = [];

function getCurrentBucket() {
  if (stack.length > 0) {
    let bucket: IBucket;
    const func = stack[stack.length - 1];

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
  function wrapper(...args: any) {
    stack.push(func);

    const bucket = getCurrentBucket();

    bucket.nextStateSlotIdx = 0;
    bucket.nextEffectIdx = 0;
    bucket.nextMemoizationIdx = 0;

    try {
      return func.apply(this, args);
    } finally {
      try {
        // runEffects(bucket)
      } finally {
        stack.pop();
      }
    }
  }

  return wrapper;
}

export function useState(initialVal: any) {
  const bucket = getCurrentBucket();
  if (bucket) {
    return useReducer(function reducer(preVal: any, vOrFn: any) {
      return typeof vOrFn == 'function' ? vOrFn(preVal) : vOrFn;
    }, initialVal);
  } else {
    throw new Error(
      'useState() only valid inside an Articulated Function or a Custom Hook.'
    );
  }
}

export function useReducer(
  reducerFn: Function,
  initialVal: any,
  ...initialReduction: any
) {
  const bucket = getCurrentBucket();

  if (bucket) {
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
  } else {
    throw new Error(
      'useReducer() only valid inside an Articulated Function or a Custom Hook.'
    );
  }
}

export function useEffect() {

}

export function useMemo() {}

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
