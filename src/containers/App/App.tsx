import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {store} from '../../store/store';
import {Header} from "../../components/Header";
import {DataTable} from "../DataTablePage";
import {DetailsPage} from "../DetailsPage";

const App: React.FC = () => (
    <Provider store={store}>
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={DataTable} />
                <Route exact path="/currency/:name" component={DetailsPage}/>
            </Switch>
        </Router>
    </Provider>
);

export default App;
