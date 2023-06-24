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
import { hideAddUserCalorieInModel } from "../../actions/helpers/helperActions";
import {
  addUser,
  addUserCalorieInByIdAndDate,
  fetchUsers,
} from "../../actions/users/userActions";

export default function AddUserCalorieInComponent() {
  let dispatch = useDispatch();
  const open = useSelector(
    (state) => state.helperReducers.openUserCalorieInModel
  );
  const user = useSelector((state) => state.userReducers.user);
  const foods = useSelector((state) => state.userReducers.foods);
  const portions = useSelector((state) => state.userReducers.portions);
  const dateFor = useSelector((state) => state.userReducers.date);

  const [food, setFood] = useState("");
  const [portion, setPortion] = useState(1);
  const [calorie, setCalorie] = useState(0);
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (food && portion) {
      console.log(food, portion, "use effect");
      let calorie = food["calories"] * portion;
      setCalorie(calorie.toFixed(2));
    }
  }, [food, portion]);

  const resetFormData = () => {
    setFood("");
    setPortion(1);
    setCalorie(0);
    setTime("");
    setErrors({});
  };

  const handleClose = () => {
    resetFormData();
    dispatch(hideAddUserCalorieInModel());
  };

  const handleAdd = async () => {
    console.log("calling add method");
    // Validation checks
    const errorObj = {};
    if (!food) {
      errorObj.food = "Food is required";
    }
    if (!portion) {
      errorObj.portion = "Portion is required";
    }
    if (!time) {
      errorObj.time = "Time is required";
    }

    // Update errors state
    setErrors(errorObj);

    // If there are no errors, perform further actions
    if (Object.keys(errorObj).length === 0) {
      // Perform the add user action
      console.log("can add");

      //   //   creating params
      const params = { dateFor: dateFor, foodId: food["_id"], portion, time };

      console.log("from add call before api");
      await dispatch(addUserCalorieInByIdAndDate(user._id, params));

      //   //   refreshing the list
      // await dispatch(fetchUsers());

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
        <DialogTitle id="alert-dialog-title">{"Add Calorie In"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter the following data to add a User's Calorie.
          </DialogContentText>
          <Grid container spacing={3} sx={{ marginTop: "16px" }}>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Food:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth error={!!errors.food}>
                <InputLabel id="demo-simple-select-label">
                  Select a food
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={food}
                  label="Select a food"
                  onChange={(e) => setFood(e.target.value)}
                  sx={{ borderColor: !!errors.food ? "red" : "" }}
                >
                  {foods.length ? (
                    foods.map((food, index) => (
                      <MenuItem key={index} value={food}>
                        {food.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Foods
                    </MenuItem>
                  )}
                </Select>
                {!!errors.food && (
                  <Typography
                    sx={{ marginLeft: "16px" }}
                    variant="caption"
                    color="error"
                  >
                    {errors.food}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Portion:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth error={!!errors.portion}>
                <InputLabel id="demo-simple-select-label">
                  Select a portion
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={portion}
                  label="Age"
                  onChange={(e) => setPortion(e.target.value)}
                  sx={{ borderColor: !!errors.portion ? "red" : "" }}
                >
                  {portions.length ? (
                    portions.map((portion, index) => (
                      <MenuItem key={index} value={portion.value}>
                        {portion.label}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Foods
                    </MenuItem>
                  )}
                </Select>
                {!!errors.portion && (
                  <Typography
                    sx={{ marginLeft: "16px" }}
                    variant="caption"
                    color="error"
                  >
                    {errors.portion}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Calories:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              {food && portion ? (
                <Chip color="primary" label={calorie} />
              ) : (
                <Chip color="primary" label="0" />
              )}
            </Grid>
            <Grid item xs={12} sm={3}>
              <DialogContentText>Time:</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth error={!!errors.time}>
                <InputLabel id="demo-simple-select-label">
                  Select a time
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Age"
                  onChange={(e) => setTime(e.target.value)}
                  sx={{ borderColor: !!errors.time ? "red" : "" }}
                >
                  <MenuItem value="breakfast">Breakfast</MenuItem>
                  <MenuItem value="lunch">Lunch</MenuItem>
                  <MenuItem value="snacks">Snacks</MenuItem>
                  <MenuItem value="dinner">Dinner</MenuItem>
                </Select>
                {!!errors.time && (
                  <Typography
                    sx={{ marginLeft: "16px" }}
                    variant="caption"
                    color="error"
                  >
                    {errors.time}
                  </Typography>
                )}
              </FormControl>
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
