import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Realtime from './pages/Realtime';


export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Realtime} />
            </Switch>
        </BrowserRouter>
    );
}
