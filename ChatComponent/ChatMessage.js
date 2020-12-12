import React, { Component } from 'react'

export default class ChatMessage extends Component {
 render() {
  return (
   <div className={this.props.class_all}>
    <div className={this.props.class_define}>
    {this.props.msg}
   </div>
   </div>
  )
 }
}
