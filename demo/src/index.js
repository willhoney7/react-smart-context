import React, { Component } from 'react';
import { render } from 'react-dom';

import createReactSmartContext from '../../src/index.tsx';

const { Provider, Consumer, withConsumer } = createReactSmartContext({
    initialState: { color: 'orange' },
    methods: {
        setColor: (color) => ({ color }),
        setColorWithPreviousState: (color) => (state) => ({ color }),
        setColorAsync(color) {
            setTimeout(() => {
                this.setState({ color });
            }, 200);
            this.setColor('orange'); // or this.state.setColor()
        },
    },
});

class Demo extends Component {
    log = (store) => {
        console.log(store);
    };
    render() {
        return (
            <React.Fragment>
                <Provider>
                    <div>
                        <h1>react-smart-context Demo</h1>
                        <Consumer>
                            {(store) => (
                                <div>
                                    <h2>Consumer 1</h2>
                                    Color: {store.color}
                                    <button onClick={() => store.setColor('purple')}>Purple</button>
                                    <button onClick={() => store.setColor('green')}>Green</button>
                                    <button onClick={() => this.log(store)}>Green</button>
                                    <button onClick={() => store.setColorAsync('yellow')}>
                                        orange then yellow
                                    </button>
                                </div>
                            )}
                        </Consumer>

                        <Consumer>
                            {(store) => (
                                <div>
                                    <h2>Consumer 2</h2>
                                    Color: {store.color}
                                    <button onClick={() => store.setColor('purple')}>Purple</button>
                                    <button onClick={() => store.setColor('green')}>Green</button>
                                </div>
                            )}
                        </Consumer>
                    </div>
                </Provider>

                {/* <Consumer>
                    {(store) => (
                        <div style={{ color: store.color }}>
                            Another Consumer
                            <button onClick={() => store.setColor('purple')}>Purple</button>
                            <button onClick={() => store.setColor('green')}>Green</button>
                        </div>
                    )}
                </Consumer> */}
            </React.Fragment>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
