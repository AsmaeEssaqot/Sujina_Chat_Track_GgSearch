import "./header.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const font = "'Great Vibes', cursive";
const fontCairo = "'Cairo',sans-serif";

// MAIN SUJINA SEARCH TEXTFEILD INHEADER COMPONENT
export const useStyles = makeStyles({
  root: {
    "& .MuiInputLabel-formControl": {
      top: "auto",
      left: "4%",
      fontFamily: font,
      fontWeight: 700,
      fontSize: "2.7vw",
      transform: " translate(0, 0) scale(1)",
      "@media (max-width:900px)": {
        fontSize: "3.7vw",
      },
    },
    "& .MuiInputLabel-shrink": {
      transform: " translate(-4%, -120%) scale(0.75)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "orange",
      },
      width: "100%",
      justifyContent: "center",
      height: "100%",
      fontSize: "2.5vw",
      fontFamily: fontCairo,
      fontWeight: 650,
      alignItems: "center",
      color: "#5e00ac",
      borderRadius: "inherit",
      paddingLeft: "2%",
    },
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    display: "flex",
    borderRadius: "inherit",
    position: "relative",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
});
// BTNS < COVID-19 TRACKER / NEWS NOW >
export const buttonUseStyles = makeStyles({
  root: {
    "& .MuiButton-label": {
      fontFamily: fontCairo,
      fontWeight: 700,
      fontSize: "2vw",
    },
    "& .MuiButton-label a": {
      fontFamily: fontCairo,
      fontWeight: 700,
      fontSize: "2vw",
    },
    width: "40%",
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
    color: "#5e00ac",
    borderRadius: "2vw",
  },
});
// AVATARS
export const avatarUseStyles = makeStyles({
  root: {
    padding: 0,
    width: "6vw",
    cursor: "pointer",
    background: "#a03878",
    height: "6vw",
    color: "lightgray",
    "@media (max-width:900px)": {
      width: "10vw",
      height: "10vw",
    },
  },
  root1: {
    borderRadius: "50%",
    color: "white",
    minWidth: "5vw",
    padding: 0,
    position: "absolute",
    right: "1%",
    minHeight: "5vw",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "@media (max-width:900px)": {
      minWidth: "8vw",
      right: "2%",
      minHeight: "8vw",
    },
  },
});
// ICONS INSIDE THE AVTR OR BTN
export const iconInUseStyles = makeStyles({
  root: {
    width: "4vw",
    height: "4vw",
    "@media (max-width:900px)": {
      width: "8vw",
      height: "8vw",
    },
  },
});
//LIST IN CHATLIST
export const useStylesList = makeStyles({
  root: {
    width: "100%",
    height: "auto",
    flex: 1,
    position: "relative",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflowY: "scroll",
  },
});
// NEW CHAT STYLES LIST
export const styleeN = (theme) => ({
  root: {
    width: "100%",
  },
});
