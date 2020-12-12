import React, { Component } from "react";
import "./chatList.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CommentIcon from "@material-ui/icons/Comment";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

export default class NewChats extends Component {
  render() {
    return (
      <ListItem
        button
        onClick={this.props.newChatRoomClicked}
      >
        <ListItemAvatar>
          <Avatar src={this.props.new_pdp}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={this.props.new_name}
          secondary={this.props.new_email}
        />
        {this.props.contact_only.includes(this.props.new_email) ? (
          <IconButton
            onClick={this.props.newChatRoomClicked}
            edge="end"
            aria-label="comment"
          >
            <CommentIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => this.props.addNewChatClicked(this.props.new_email)}
            edge="end"
            aria-label="add"
          >
            <PersonAddIcon />
          </IconButton>
        )}
      </ListItem>
    );
  }
}
 
