# react-context-store

<!-- [![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls] -->

ReactSmartContext is a lightweight library used for creating smarter [Context](https://reactjs.org/docs/context.html) Providers. Pass in an object of the `initialState` and any methods you want and you'll receive an object of a `Provider` component, `Consumer` component, and `withConsumer` [HOC](https://reactjs.org/docs/higher-order-components.html). This library helps you use React Context in an efficient way with less code. See below for details.

For more information on why this is important, see [this article by Ryan Florence](https://medium.com/@ryanflorence/react-context-and-re-renders-react-take-the-wheel-cd1d20663647.)

Before

```jsx
const ColorContext = React.createContext();
class ProviderWrapper extends React.Component {
    state = {
        color: 'orange',
        setColor: (color) => {
            this.setState({ color });
        }
    }
    render() {
        return (
            <ColorContext.Provider value={this.state}>{this.props.children}</ColorContext.Provider>
        );
    }
}

const withConsumer = (WrappedComponent, providerName = 'provider') => (props) => (
    <Consumer>
        {(store) => <WrappedComponent {...{ [providerName]: store }} {...props} />}
    </Consumer>
);

export { ColorContext.Provider as Provider, ColorContext.Consumer as Consumer, withConsumer };
```

After

```js
const { Provider, Consumer, withConsumer } = createSmartReactContext({
    initialState: { color: 'orange' },
    setColor: (color) => ({ color }),
});
export { Proivder, Consumer, withConsumer };
```

<!-- [build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo -->
