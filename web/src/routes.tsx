import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing'; 
import OrphangeMap from './pages/OrphangeMap'; 

function Routes(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/"  exact component={Landing}/>
            <Route path="/app" component={OrphangeMap}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes