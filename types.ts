export interface State {
    [key: string]: any;
}
type SimpleReturnValue = null | undefined | State;
type FunctionReturnValue = (state: State) => SimpleReturnValue;
export type ReturnValue = SimpleReturnValue | FunctionReturnValue;
export type Method = (...args: any[]) => ReturnValue;

export interface Initialization {
    initialState: State;
    methods?: {
        [key: string]: Method;
    };
}
