import React, { Component } from "react";
import "./chatList.css";
import SearchIcon from "@material-ui/icons/Search";
import ChatRoom from "./ChatRoom";
import SettingsIcon from "@material-ui/icons/Settings";
import TextField from "@material-ui/core/TextField";
import NewChats from "./NewChats";
import List from "@material-ui/core/List";
import { IconButton, ListItem } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
export default class ChatList extends Component {
  constructor() {
    super();
    this.state = {
      isPhone: false,
    };
  }
  render() {
    return (
      <div className="chat_list_all_of_all">
        <ListItem
          className="chat_conv_header"
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          <TextField style={{ flex: 1 }} placeholder="search for contact" />
          <IconButton>
            <SearchIcon edge="end" />
          </IconButton>
        </ListItem>
        <div className="newChatBtn" onClick={this.props.newChatBtnClicked}>
          New Chat
        </div>
        <h1>
          {this.props.isNewVisible === false
            ? "Your Chat Rooms"
            : "Disponible Chats"}
        </h1>
        <List
          className="chat_list_all"
          component="nav"
          aria-label="main mailbox folders"
        >
          {this.props.isNewVisible === false &&
          this.props.contact_only !== undefined
            ? this.props.contact_only.map((userInfo, _index) => (
                <ChatRoom
                  sizee={this.props.sizee}
                  clickChatNotSender={this.props.clickChatNotSender}
                  receiverHasRead={this.props.receiverHasRead}
                  key={_index}
                  contacts_name={
                    this.props.contactArray[0] === undefined
                      ? `contact,${_index + 1}`
                      : this.props.contactArray[_index].cantactName
                  }
                  contactPic={
                    this.props.contactArray[0] === undefined
                      ? `contact,${_index + 1}`
                      : this.props.contactArray[_index].contactPic
                  }
                  indexSelectedFct={this.props.indexSelectedFct}
                  index={_index}
                  last_msg={this.props.last_msg[_index]}
                />
              ))
            : this.props.contactAll[0].map((_con, _ind) => (
                <NewChats
                  contact_only={this.props.contact_only}
                  sizee={this.props.sizee}
                  key={_ind}
                  new_name={_con[0]}
                  new_email={_con[1]}
                  new_pdp={_con[2]}
                  addNewChatClicked={this.props.addNewChatClicked}
                  newChatRoomClicked={this.props.newChatRoomClicked}
                />
              ))}
        </List>
        <ListItem
          className="chat_conv_header"
          style={{
            justifyContent: "space-between",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <IconButton edge="start" aria-label="settings">
            <SettingsIcon />
          </IconButton>
          <Link to= '/'>
            <IconButton edge="end" aria-label="exit">
              <ExitToAppIcon />
            </IconButton>
          </Link>
        </ListItem>
      </div>
    );
  }
  // exitt = () => (window.location.href = "/");
}
