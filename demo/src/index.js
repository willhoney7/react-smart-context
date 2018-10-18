import React, { Component } from 'react';
import { render } from 'react-dom';

import createReactSmartContext from '../../src';

const { Provider, Consumer, withConsumer } = createReactSmartContext({
    initialState: { color: 'orange' },
    setColor: (color) => ({ color }),
});

class Demo extends Component {
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
