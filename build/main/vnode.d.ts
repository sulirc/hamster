export declare const enum VNodeType {
    Text = 1,
    Node = 2,
    Composite = 4,
    Void = 16,
    Portal = 32
}
export declare function createVNode(type: any, props: any, children: any): {
    vtype: VNodeType;
    type: any;
    props: any;
    children: any;
    dom: any;
};
export declare function createVoid(): {
    dom: any;
    vtype: VNodeType;
};
export declare function createVText(text: any): {
    vtype: VNodeType;
    text: any;
    dom: any;
};
