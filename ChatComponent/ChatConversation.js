import React, { Component } from "react";
import "./chatList.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CallIcon from "@material-ui/icons/Call";
import VideocamIcon from "@material-ui/icons/Videocam";
import SendIcon from "@material-ui/icons/Send";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import TextField from "@material-ui/core/TextField";
import ChatMessage from "./ChatMessage";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

export default class ChatConversation extends Component {
  componentDidUpdate() {
    this.scrl();
  }
  componentDidMount() {
    this.scrl();
  }
  scrl() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }
  constructor() {
    super();
    this.state = {
      chat_text: "",
    };
  }

  render() {
    if (this.props.selectedIndex === null) {
      return (
        <div className="chat_conv_all_of_all">
          <ListItem
            className="chat_conv_header"
            style={{
              alignItems: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <ListItemText primary="SUJINA CHAT" secondary="enjoy chattting" />
          </ListItem>
          <div id="chat_conv_body_id" className="chat_conv_body">
            <div>
              <h1>loding</h1>
            </div>
            <div
              ref={(el) => {
                this.el = el;
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="chat_conv_all_of_all">
            <ListItem
              className="chat_conv_header"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <IconButton
                onClick={this.props.sizee}
                id="arrow_back"
                className="arrow_back"
                edge="start"
              >
                <ArrowBackIcon />
              </IconButton>
              <ListItemAvatar>
                <Avatar
                  src={
                    this.props.contactArray[this.props.selectedIndex].contactPic
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  this.props.contactArray[this.props.selectedIndex].cantactName
                }
                secondary={
                  this.props.contactArray[this.props.selectedIndex].contactEmail
                }
              />

              <IconButton className="video_icon">
                <VideocamIcon />
              </IconButton>
              <IconButton>
                <CallIcon />
              </IconButton>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </ListItem>
            <div id="chat_conv_body_id" className="chat_conv_body">
              {this.props.chats[this.props.selectedIndex].map(
                (_set, _index) => (
                  <ChatMessage
                    key={_index}
                    msg={_set.message}
                    class_all={
                      _set.sender === this.props.user_email
                        ? "chat_msg_all_sen"
                        : "chat_msg_all_rec"
                    }
                    class_define={
                      _set.sender === this.props.user_email
                        ? "chat_msg_sent"
                        : "chat_msg_received"
                    }
                  />
                )
              )}
              <div
                ref={(el) => {
                  this.el = el;
                }}
              />
            </div>

            <ListItem
              className="chat_conv_header"
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              <IconButton>
                <ImageOutlinedIcon />
              </IconButton>
              <IconButton>
                <SentimentVerySatisfiedIcon />
              </IconButton>
              <TextField
                style={{ flex: 1 }}
                id="chat_text_id"
                onKeyUp={(e) => this.userTyping(e)}
                onFocus={this.userClickedInput}
                placeholder="Type message"
              />
              <IconButton edge="end">
                <SendIcon onClick={this.submitMessage} />
              </IconButton>
            </ListItem>
          </div>
        </>
        
      );
    }
  }
  userTyping = (e) =>
    e.keyCode === 13
      ? this.submitMessage()
      : this.setState({ chat_text: e.target.value });

  messageValid = (txt) => txt && txt.replace(/\s/g, "").length;

  userClickedInput = () => this.props.messageRead();

  submitMessage = () => {
    if (this.messageValid(this.state.chat_text)) {
      this.props.submitMsg(this.state.chat_text);
      document.getElementById("chat_text_id").value = "";
      this.setState({ chat_text: "" });
    }
  };
}
