import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { hideAddUserCalorieOutModel } from "../../actions/helpers/helperActions";
import { addUserCalorieOutByIdAndDate } from "../../actions/users/userActions";

export default function AddUserCalorieOutComponent() {
  let dispatch = useDispatch();
  const open = useSelector(
    (state) => state.helperReducers.openUserCalorieOutModel
  );
  const user = useSelector((state) => state.userReducers.user);
  const activities = useSelector((state) => state.userReducers.activities);
  const durations = useSelector((state) => state.userReducers.durations);
  const dateFor = useSelector((state) => state.userReducers.date);

  //   const [activityObj, setActivityObj] = useState({});
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState(10);
  const [calorieBurnt, setCalorieBurnt] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (activity && duration) {
      let calorie = activity["metValue"] * user["weight"] * (duration / 60);
      setCalorieBurnt(calorie.toFixed(2));
    }
  }, [activity, duration]);

  const handleActivity = async (act) => {
    // setActivityObj(act);
    setActivity(act["specificMotion"]);
  };

  const resetFormData = () => {
    setActivity("");
    // setActivityObj({});
    setDuration(0);
    setCalorieBurnt(0);
    setErrors({});
  };

  const handleClose = () => {
    resetFormData();
    dispatch(hideAddUserCalorieOutModel());
  };

  const handleAdd = async () => {
    // Validation checks
    const errorObj = {};
    if (!activity) {
      errorObj.activity = "Activity is required";
    }
    if (!duration) {
      errorObj.duration = "Duration is required";
    }

    // Update errors state
    setErrors(errorObj);

    // If there are no errors, perform further actions
    if (Object.keys(errorObj).length === 0) {
      // Perform the add user action
      console.log("can add");

      //   //   creating params
      const params = {
        dateFor,
        activityId: activity["_id"],
        duration,
        caloryBurnt: calorieBurnt,
      };

      await dispatch(addUserCalorieOutByIdAndDate(user._id, params));

      //   // close form
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
        <DialogTitle id="alert-dialog-title">{"Add Calorie Out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter the following data to add a User's Activity.
          </DialogContentText>
          <Grid container spacing={3} sx={{ marginTop: "16px" }}>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Activity:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth error={!!errors.activity}>
                <InputLabel id="demo-simple-select-label">
                  Select an activity
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={activity}
                  label="Select an activity"
                  onChange={(e) => setActivity(e.target.value)}
                  sx={{ borderColor: !!errors.activity ? "red" : "" }}
                >
                  {activities.length ? (
                    activities.map((activty, index) => (
                      <MenuItem key={index} value={activty}>
                        {activty.specificMotion}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Activities
                    </MenuItem>
                  )}
                </Select>
                {!!errors.activity && (
                  <Typography
                    sx={{ marginLeft: "16px" }}
                    variant="caption"
                    color="error"
                  >
                    {errors.activity}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Durations:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth error={!!errors.duration}>
                <InputLabel id="demo-simple-select-label">
                  Select a duration
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={duration}
                  label="Select an duration"
                  onChange={(e) => setDuration(e.target.value)}
                  sx={{ borderColor: !!errors.duration ? "red" : "" }}
                >
                  {durations.length ? (
                    durations.map((duration, index) => (
                      <MenuItem key={index} value={duration.value}>
                        {duration.label}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Activities
                    </MenuItem>
                  )}
                </Select>
                {!!errors.duration && (
                  <Typography
                    sx={{ marginLeft: "16px" }}
                    variant="caption"
                    color="error"
                  >
                    {errors.duration}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Calories Burnt:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              {calorieBurnt ? (
                <Chip color="primary" label={calorieBurnt} />
              ) : (
                <Chip color="primary" label="0" />
              )}
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
