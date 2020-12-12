import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Avatar, Button, TextField } from "@material-ui/core";
import "./header.css";
import {
  useStyles,
  buttonUseStyles,
  avatarUseStyles,
  iconInUseStyles,
} from "./Styles";

function Header({onSubmit,onLogOut, logInState, email, photo, userName }) {
  //START CLASSES STYLES
  const classesicon = iconInUseStyles();
  const classesAvtr = avatarUseStyles();
  const classes = useStyles();
  const classesBtn = buttonUseStyles();
  //END CLASSES STYLES
  //START VARIABLES

  const [searchState, setSearchState] = useState("");
  //END VARIABLES
  //START SMALL FCTS
  const updateSearchState = (event) => {
    event.preventDefault();
    window.open("//" + "google.com/search?q=" + searchState, "_blank");
    setSearchState("");
  };
  const _handleKeyDown = (e) => {
    if (searchState && searchState.replace(/\s/g, "").length) {
      if (e.key === "Enter") {
        updateSearchState(e);
      }
    }
  };

  //END SMALL FCTS
  return (
    <div className="home_all">
      <div className="header_all">
        <div className="left_header">
          <a href="#">About</a>
          <Link to={logInState ? "/ChatsRoom" : "/"}>Contact</Link>
        </div>
        <div className="right_header">
          {logInState === false ? (
            <>
              <a href="#" onClick={onSubmit}>
                LogIn
              </a>
              <a href="#">Smail</a>
              <Avatar
                classes={{
                  root: classesAvtr.root,
                }}
              >
                <AccountCircleOutlinedIcon
                  classes={{
                    root: classesicon.root,
                  }}
                />
              </Avatar>
            </>
          ) : (
            <>
              <a href="#" onClick={onLogOut}>
                LogOut
              </a>
              <a href="#">{userName}</a>
              <Avatar
                src={photo}
                classes={{
                  root: classesAvtr.root,
                }}
              ></Avatar>
            </>
          )}
        </div>
      </div>
      <div className="body_all">
        <div className="body_logo"></div>
        <div className="body_search">
          <TextField
            classes={{
              root: classes.root,
            }}
            onKeyDown={_handleKeyDown}
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            label="Search in Sujina"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!(searchState && searchState.replace(/\s/g, "").length)}
            onClick={updateSearchState}
            classes={{
              root: classesAvtr.root1,
            }}
          >
            <SearchIcon />
          </Button>
        </div>
        <div className="under_search">
          <Button
            classes={{
              root: classesBtn.root,
            }}
            variant="contained"
          >
            News Now
          </Button>
          <Button
            classes={{
              root: classesBtn.root,
            }}
            variant="contained"
          >
            <Link to="/Covid19Track">Track Covid-19</Link>
          </Button>
        </div>
        <div className="final_info">
          <p>Morocco</p>
          <a href="https://www.linkedin.com/in/bargady-ahmed-082b30177">
            @Ahmed Bargady
          </a>
        </div>
      </div>
    </div>
  );
}
export default Header;
