
import './App.css';
import React from "react"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Login from "./pages/Login"
import HomePage from "./pages/Home";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="/login"/>
            <Route path= "/login" component={Login} />
            <Route path="/home" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
