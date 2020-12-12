import "./chatList.css";
import React, { Component } from "react";
import { NotificationImportant } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default class ChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: null,
    };
  }
  render() {
    return (
      <ListItem
        button
        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
        selected={this.state.selectedIndex === this.props.index}
        onClick={() => this.selectChatRoom(this.props.index)}
      >
        <ListItemAvatar>
          <Avatar src={this.props.contactPic}>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={this.props.contacts_name}
          secondary={this.props.last_msg}
        />
        {this.props.receiverHasRead === false &&
        this.props.clickChatNotSender(this.props.index) === true ? (
          <ListItemIcon>
            <NotificationImportant edge="end" />
          </ListItemIcon>
        ) : null}
      </ListItem>
    );
  }
  selectChatRoom(f){
    this.setState({
      selectedIndex: f,
    });
    this.props.indexSelectedFct(f);
  };
}
