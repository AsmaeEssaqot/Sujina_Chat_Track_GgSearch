import React, { Component } from "react";
import ChatConversation from "./ChatConversation";
import ChatList from "./ChatList";
import firebase, { db } from "../Firebase";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      receiverHasRead: false,
      isNewVisible: false,
      contactArray: [],
      contacts_only: [],
      selectedIndex: null,
      user_email: this.props.email,
      doc_id: [],
      last_msg: [],
      contactAll: [],
      logInState: this.props.logInState,
    };
    this.indexSelectedFct = this.indexSelectedFct.bind(this);
  }
  componentDidMount = () => {
    if (this.state.logInState) {
      firebase.auth().onAuthStateChanged(async (_usr) => {
        if (_usr !== null) {
          // GET MESSAGES, AND SPECIFY THE USERS IN CONTACT
          await firebase
            .firestore()
            .collection("chats")
            .where("users", "array-contains", _usr.email)
            .onSnapshot(async (res) => {
              const chats = res.docs.map((_doc) => _doc.data().messages);
              const contacts = res.docs.map((_doc) => _doc.data().users);
              const doc_id = res.docs.map((_doc) => _doc.id);
              const contacts_only = [];
              // GET THE USERS IN CONTACT EMAILS
              contacts.map(async (name) => {
                if (name[0] === _usr.email) {
                  contacts_only.push(name[1]);
                } else {
                  contacts_only.push(name[0]);
                }
              });
              const last_msg_j = [];
              // GET THE LAST MESSAGES ARRAY
              chats.map((room) =>
                room.length === 0
                  ? last_msg_j.push("NONE")
                  : last_msg_j.push(room[room.length - 1].message)
              );
              // PASS THE STATES
              await this.setState({
                chats: chats,
                contacts_only: contacts_only,
                user_email: _usr.email,
                doc_id: doc_id,
                last_msg: last_msg_j,
              });
              //GET THE USERS IN CONTACT INFO ARRAY <NAME , PDP> !!!!! NOT IMPORTANT !!!!!
              await this.state.contacts_only.map(async (_email) => {
                db.collection("users")
                  .where("email", "==", _email)
                  .onSnapshot(async (ress) => {
                    const cantactName = ress.docs.map(
                      (_docc) => _docc.data().name
                    );
                    const contactPic = ress.docs.map(
                      (_docc) => _docc.data().pdp
                    );
                    // SET THE INFO INSIDE THE CONTACT ARRAY <NAME, PDP, EMAIL>
                    await this.state.contactArray.push({
                      cantactName: cantactName,
                      contactPic: contactPic,
                      contactEmail: _email,
                    });
                  });
              });
              //GET ALL THE USERS INFO IN SETS IN ONE ARRAY
              const first = [];
              const second = [];
              db.collection("users")
                .where("email", "!=", _usr.email)
                .onSnapshot((resss) => {
                  first.push(
                    resss.docs.map((_docc, _indx) => [
                      _docc.data(_indx).name,
                      _docc.data(_indx).email,
                      _docc.data(_indx).pdp,
                    ])
                  );
                  second[0] = first[first.length - 1];
                });
              this.setState({
                contactAll: second,
              });
            });
        } else {
          return;
        }
      });
    } else {
      return;
    }
  };
  render() {
    return (
      <div className="chat_all">
        <div id="chat_all_left" className="chat_all_left">
          <ChatList
            sizee={this.sizee}
            clickChatNotSender={this.clickChatNotSender}
            receiverHasRead={this.state.receiverHasRead}
            last_msg={this.state.last_msg}
            indexSelectedFct={this.indexSelectedFct}
            newChatRoomClicked={this.newChatRoomClicked}
            contact_only={this.state.contacts_only}
            contactArray={this.state.contactArray}
            contactAll={this.state.contactAll}
            isNewVisible={this.state.isNewVisible}
            addNewChatClicked={this.addNewChatClicked}
            newChatBtnClicked={this.newChatBtnClicked}
            contactAll={this.state.contactAll}
          ></ChatList>
        </div>
        <div id="chat_all_right" className="chat_all_right">
          <ChatConversation
            sizee={this.sizee}
            submitMsg={this.submitMsg}
            user_email={this.state.user_email}
            selectedIndex={this.state.selectedIndex}
            chats={this.state.chats}
            contactArray={this.state.contactArray}
            messageRead={this.messageRead}
          />
        </div>
      </div>
    );
  }
  sizee = () => {
    let leftt = document.getElementById("chat_all_left");
    let rightt = document.getElementById("chat_all_right");
    if (window.innerWidth <= 900) {
      if (leftt.style.display === 'block') {
        leftt.style.display = 'none';
        rightt.style.display = 'block';
      } else {
        leftt.style.display = "block";
        rightt.style.display = "none";
      }
    }else{
      leftt.style.display = "block";
      rightt.style.display = "block";
    }
  };
  newChatBtnClicked = () =>
    this.setState({
      isNewVisible: true,
    });
  newChatRoomClicked = () => {
    this.setState({
      isNewVisible: false,
    });
  };
  indexSelectedFct = async (index) => {
    await this.setState({
      selectedIndex: index,
      isNewVisible: false,
    });
    this.sizee();
    this.messageRead();
  };
  messageRead = () => {
    if (this.clickChatNotSender(this.state.selectedIndex)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(this.state.doc_id[this.state.selectedIndex])
        .update({
          receiverHasRead: true,
        });
      this.setState({
        receiverHasRead: true,
      });
    }
  };
  addNewChatClicked = (_email) => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", _email)
      .onSnapshot(async (ress) => {
        const cantactName = ress.docs.map((_docc) => _docc.data().name);
        const contactPic = ress.docs.map((_docc) => _docc.data().pdp);
        await this.state.contactArray.splice(0, 0, {
          cantactName: cantactName,
          contactPic: contactPic,
          contactEmail: _email,
        });
      });
    db.collection("chats")
      .doc(_email + this.state.user_email)
      .set({
        users: [_email, this.state.user_email],
        receiverHasRead: false,
        messages: [
          {
            message: "hi, can i be your friend ?",
            sender: this.state.user_email,
            timesTamp: Date.now(),
          },
        ],
      });
  };
  clickChatNotSender = (chatIndex) =>
    this.state.chats[chatIndex][this.state.chats[chatIndex].length - 1]
      .sender !== this.state.user_email;
  submitMsg = (msg) => {
    db.collection("chats")
      .doc(this.state.doc_id[this.state.selectedIndex])
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.user_email,
          message: msg,
          timesTamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };
}
