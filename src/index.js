import React from 'react';

const ThrowError = () => {
    throw new Error('Attempted to use Consumer without a Store');
};

export default function createReactContextStore(store) {
    const { initialState = {}, ...methods } = store;
    const { Provider, Consumer } = React.createContext();

    class ContextStore extends React.PureComponent {
        constructor() {
            super();

            Object.keys(methods).forEach(
                (methodName) => (this[methodName] = methods[methodName].bind(this))
            );

            this.state = Object.keys(methods).reduce(
                (state, methodName) => {
                    if (state[methodName]) {
                        throw new Error(`Duplicate state key and method name: ${methodName}`);
                    } else {
                        state[methodName] = this[methodName];
                    }
                    return state;
                },
                { ...initialState }
            );
        }
        render() {
            return <Provider value={this.state}>{this.props.children}</Provider>;
        }
    }

    const GuardedConsumer = ({ children }) => (
        <Consumer>{(store) => (store ? children(store) : <ThrowError />)}</Consumer>
    );

    const withStore = (WrappedComponent, storeName = 'store') => (props) => (
        <GuardedConsumer>
            {(store) => <WrappedComponent {...{ [storeName]: store }} {...props} />}
        </GuardedConsumer>
    );

    return { Store: ContextStore, Consumer: GuardedConsumer, withStore };
}
