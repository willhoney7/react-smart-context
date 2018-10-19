import * as React from 'react';

import { State, Method, ReturnValue, Initialization } from '../types';

const ThrowError = (): never => {
    throw new Error('Attempted to use Consumer without a Store');
};

export default function createReactSmartContext(initialization: Initialization) {
    const { initialState = {}, methods = {} } = initialization;
    const { Provider, Consumer } = React.createContext<State>({});

    class SmartProvider extends React.Component<{ children: React.ReactType }, State> {
        public state: State = Object.keys(methods).reduce(
            (state: State, methodName: string) => {
                if (state[methodName] !== undefined) {
                    throw new Error(`Duplicate state key and method name: ${methodName}`);
                } else {
                    // TODO why do I need to typecast this as any
                    state[methodName] = (this as any)[methodName] = (...args: any[]) => {
                        const method: Method = methods[methodName];
                        const result: ReturnValue = method.apply(this, args);
                        if (result !== undefined) this.setState(result);
                    };
                }
                return state;
            },
            { ...initialState }
        );
        public render() {
            return <Provider value={this.state}>{this.props.children}</Provider>;
        }
    }

    const GuardedConsumer = ({ children }: { children?: (state: State) => JSX.Element }) => (
        <Consumer>{(state: State) => (state ? children(state) : <ThrowError />)}</Consumer>
    );

    const withConsumer = (
        WrappedComponent: React.ComponentClass | React.StatelessComponent,
        propName: string = 'context'
    ) => (props: object) => (
        <GuardedConsumer>
            {(state: State): JSX.Element => (
                <WrappedComponent {...{ [propName]: state }} {...props} />
            )}
        </GuardedConsumer>
    );

    return { Provider: SmartProvider, Consumer: GuardedConsumer, withConsumer };
}
