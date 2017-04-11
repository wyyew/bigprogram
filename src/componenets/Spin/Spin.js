import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Spin (props) {
  const styles = require('./Spin.scss');
  return (
    <div className = {styles.spin}>
      {props.loadingNumber > 0 && (<i className="fa fa-spinner fa-spin fa-3x fa-fw" />)}
    </div>
  );
}

Spin.propTypes = {
  loadingNumber: PropTypes.number.isRequired
};

export default connect(state => ({ loadingNumber: state.async.loadingNumber || 0}))(Spin);
