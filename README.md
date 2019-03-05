# react-context-store

ReactSmartContext is a lightweight library that helps you use React Context efficiently and with less boilerplate code. Pass in an object of the `initialState` and any methods you want and you'll receive an object of a `Provider` component, `Consumer` component, and `withConsumer` [HOC](https://reactjs.org/docs/higher-order-components.html). See below for details.

For more information on why this is important, see [this article by Ryan Florence](https://medium.com/@ryanflorence/react-context-and-re-renders-react-take-the-wheel-cd1d20663647).

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
export { Provider, Consumer, withConsumer };
```

# Examples

A more detailed example:

```js
const { Provider, Consumer, withConsumer } = createReactSmartContext({
    initialState: { color: 'orange' },
    // shorthand
    setColor: (color) => ({ color }),
    // shorthand with previous state
    setColorWithPreviousState: (color) => (prevState) => ({ color, previousColor: prevState.color }),
    // setState using asynchronous data (notice that it's NOT an arrow function)
    setColorAsynchronous() {
        this.setState({ loading: true })
        getColorFromServer().then(color => {
            this.setState({ color, loading: false })
        })
    },
    // set color once it's saved in database
    setColorOnceSaved(color) {
        this.setState({ loading: true })
        updateColorInDatabase(color).then(color => {
            this.setState({ color });
        });
    },
    // set color in database optimistically
    setColorOptimistically(color) {
        const previousColor = this.state.color;
        this.setState({ color }); // set it immediately
        updateColorInDatabase(color).catch(er => { // rollback on fail
            this.setState({ color: previousColor });
        });
    }
    // you can use methods in other methods
    setColorViaOtherMethod(color) {
        this.setColor(color); // or this.state.setColor(color);
    }
});

// in use
<Provider>
    ...
    <Consumer>
        {(context) => {
            <div>
                <button onClick={() => context.setColor('red')}>set red</button>
                <button onClick={context.setColorAsynchronous}>fetch color from server</button>
            </div>
        }}
    </Consumer>
    ...
</Provider>
```

<!-- [build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo -->
