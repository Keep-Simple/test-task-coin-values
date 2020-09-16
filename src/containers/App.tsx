import React from 'react';
import {Provider} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {store} from '../store/store';

const App: React.FC = () => (
            <Provider store={store}>
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/about">
                                {/*<About />*/}
                            </Route>
                            <Route path="/users">
                                {/*<Users />*/}
                            </Route>
                            <Route path="/">
                                {/*<Home />*/}
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </Provider>
);

export default App;
