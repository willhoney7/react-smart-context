import React from 'react';

const ThrowError = () => {
    throw new Error('Attempted to use Consumer without a Store');
};

export default function createReactSmartContext(initialization) {
    const { initialState = {}, ...methods } = initialization;
    const { Provider, Consumer } = React.createContext();

    class SmartProvider extends React.PureComponent {
        state = Object.keys(methods).reduce(
            (state, methodName) => {
                if (state[methodName] !== undefined) {
                    throw new Error(`Duplicate state key and method name: ${methodName}`);
                } else {
                    state[methodName] = this[methodName] = (...args) => {
                        const result = methods[methodName].apply(this, args);
                        if (result !== undefined) this.setState(result);
                    };
                }
                return state;
            },
            { ...initialState }
        );
        render() {
            return <Provider value={this.state}>{this.props.children}</Provider>;
        }
    }

    const GuardedConsumer = ({ children }) => (
        <Consumer>{(store) => (store ? children(store) : <ThrowError />)}</Consumer>
    );

    const withConsumer = (WrappedComponent, propName = 'context') => (props) => (
        <GuardedConsumer>
            {(context) => <WrappedComponent {...{ [propName]: context }} {...props} />}
        </GuardedConsumer>
    );

    return { Provider: SmartProvider, Consumer: GuardedConsumer, withConsumer };
}
