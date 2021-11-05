import MainLayout from './MainLayout'
import React from "react";
import { Route, Redirect, Switch } from 'react-router-dom'
export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/MainLayout" component={MainLayout}></Route>
        <Redirect to="/MainLayout"></Redirect>
      </Switch>
    )
  }
}