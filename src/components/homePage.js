"use strict";

var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link;

var Home = React.createClass({
    render: function(){
        return (
            <div className='jumbotron'>
                <h1>React learning tutorial</h1>
                <p>We will be making an app in React</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
            </div>
        );
    }
});

module.exports = Home;