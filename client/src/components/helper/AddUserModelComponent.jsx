import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { hideAddUserModel } from "../../actions/helpers/helperActions";
import { addUser, fetchUsers } from "../../actions/users/userActions";

export default function AddUserModelComponent() {
  let dispatch = useDispatch();
  const open = useSelector((state) => state.helperReducers.openAddUserModel);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [sex, setSex] = useState("");
  const [age, setAge] = useState(0);
  const [errors, setErrors] = useState({});

  const resetFormData = () => {
    setName("");
    setWeight(0);
    setHeight(0);
    setSex("");
    setAge(0);
    setErrors({});
  };

  const handleClose = () => {
    resetFormData();
    dispatch(hideAddUserModel());
  };

  const handleAdd = async () => {
    // Validation checks
    const errorObj = {};
    if (!name) {
      errorObj.name = "Name is required";
    }
    if (weight <= 0) {
      errorObj.weight = "Weight must be greater than 0";
    }
    if (height <= 0) {
      errorObj.height = "Height must be greater than 0";
    }
    if (!sex) {
      errorObj.sex = "Sex is required";
    }
    if (age <= 0) {
      errorObj.age = "Age must be greater than 0";
    }

    // Update errors state
    setErrors(errorObj);

    // If there are no errors, perform further actions
    if (Object.keys(errorObj).length === 0) {
      // Perform the add user action
      console.log("can add");

      //   creating params
      const params = { name, weight, height, sex, age };

      await dispatch(addUser(params));

      //   refreshing the list
      await dispatch(fetchUsers());

      // close form
      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter the following data to add a User.
          </DialogContentText>
          <Grid container spacing={3} sx={{ marginTop: "16px" }}>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Name:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Weight (in KG):</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                error={!!errors.weight}
                helperText={errors.weight}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Height (in CM):</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                error={!!errors.height}
                helperText={errors.height}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Sex:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth error={!!errors.sex}>
                <InputLabel id="demo-simple-select-label">
                  Select a gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sex}
                  label="Age"
                  onChange={(e) => setSex(e.target.value)}
                  sx={{ borderColor: !!errors.sex ? "red" : "" }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                {!!errors.sex && (
                  <Typography
                    sx={{ marginLeft: "16px" }}
                    variant="caption"
                    color="error"
                  >
                    {errors.sex}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Age:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                error={!!errors.age}
                helperText={errors.age}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
