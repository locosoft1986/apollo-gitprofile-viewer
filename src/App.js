import React, { Component } from 'react';

import { Router } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import {Layout, Repositories, Commits} from './containers';

import './App.css';

import createHistory from 'history/createBrowserHistory';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

const networkInterface = createNetworkInterface({ uri: 'https://api.github.com/graphql' })
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    req.options.headers.authorization = `bearer ${githubToken}`
    next()
  }
}])

const history = createHistory();
const client = new ApolloClient({
  networkInterface: networkInterface,
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/repositories"/>
            </Route>
            <Layout>
              <Route path="/repositories" component={Repositories} exact/>
              <Route path="/repositories/:owner/:name/:branch" component={Commits} exact/>
            </Layout>
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
