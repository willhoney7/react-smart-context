import React, { Component } from 'react';
import { render } from 'react-dom';

import createReactContextStore from '../../src';

const { Store, Consumer, withStore } = createReactContextStore({
    initialState: { color: 'orange' },
    setColor: (color) => ({ color }),
});

class Demo extends Component {
    render() {
        return (
            <React.Fragment>
                <Store>
                    <div>
                        <h1>react-context-store Demo</h1>
                        <Consumer>
                            {(store) => (
                                <div>
                                    Color: {store.color}
                                    <button onClick={() => store.setColor('purple')}>Purple</button>
                                    <button onClick={() => store.setColor('green')}>Green</button>
                                </div>
                            )}
                        </Consumer>

                        <Consumer>
                            {(store) => (
                                <div style={{ color: store.color }}>
                                    Another Consumer
                                    <button onClick={() => store.setColor('purple')}>Purple</button>
                                    <button onClick={() => store.setColor('green')}>Green</button>
                                </div>
                            )}
                        </Consumer>
                    </div>
                </Store>

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
