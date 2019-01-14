"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/homePage')} />
        <Route name="authors" handler={require('./components/authors/authorPage')} />
        <Route name="about" path="about-us" handler={require('./components/about/aboutPage')} />
        <NotFoundRoute handler={require('./components/404')} />
        <Redirect from="old-authors" to="authors" />
    </Route>
);

module.exports = routes;
