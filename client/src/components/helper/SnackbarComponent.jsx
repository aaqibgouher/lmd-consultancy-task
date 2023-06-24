import { useSelector, useDispatch } from "react-redux";
import { Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { hideSnackbar } from "../../actions/helpers/helperActions";

const SnackbarComponent = () => {
  let open = useSelector((state) => state.helperReducers.showSnackbar);
  let message = useSelector((state) => state.helperReducers.snackbarMessage);
  let dispatch = useDispatch();

  setTimeout(() => {
    dispatch(hideSnackbar());
    console.log("called");
  }, 3000);

  return (
    <>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        //   onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </>
  );
};

export default SnackbarComponent;
