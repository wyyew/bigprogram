import React, { Component } from 'react'
import { connect } from 'react-redux'
import Counter from '../../componenets/counter/counter'

const AppRoot =  connect(
  (state) => ({value: state}),
  (dispatch) => {
    return{
      onIncrement: () => dispatch({ type: 'INCREMENT' }),
      onDecrement: () => dispatch({ type: 'DECREMENT' })
    }
  })(Counter);
export default AppRoot
