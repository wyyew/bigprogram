import React, { Component } from 'react';
import {IndexLink } from 'react-router';
import PropTypes from 'prop-types';
// import { Navbar, Nav, NavItem } from 'react-bootstrap';
// import { Linkcontainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
import { Spin } from 'antd';
import config from '../../config';

class Main extends Component {// eslint-disable-line
  render() {
    require('./Main.scss');
    return (
      <div>
        <Helmet {...config.app.head} />
        <ul>
          <li><IndexLink to="/" activeStyle={{color:'red'}}><span>{config.app.title}</span></IndexLink></li>
          <li><Link to="/counter" activeStyle={{color:'red'}}>计数器</Link></li>
        </ul>
        <Spin />
        <div>
          {/* this will render the child routes */}
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  children: PropTypes.any.isRequired
};

export default Main
