import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useParams } from "react-router-dom";
import {
  fetchActivities,
  fetchFoods,
  fetchUser,
  updateDate,
} from "../../actions/users/userActions";
import {
  showAddUserCalorieInModel,
  showAddUserCalorieOutModel,
} from "../../actions/helpers/helperActions";

const UserDetailComponent = () => {
  const { userId } = useParams();
  let user = useSelector((state) => state.userReducers.user);
  let date = useSelector((state) => state.userReducers.date);

  let dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState([]);
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();

  const getTodayAndThirtyDaysBefore = () => {
    const today = new Date(); // Get today's date

    const thirtyDaysBefore = new Date();
    thirtyDaysBefore.setDate(today.getDate() - 30); // Get the date 30 days before today

    return {
      today: today.toISOString().split("T")[0], // Format today's date as "YYYY-MM-DD"
      thirtyDaysBefore: thirtyDaysBefore.toISOString().split("T")[0], // Format the date 30 days before as "YYYY-MM-DD"
    };
  };

  const handleDate = (date) => {
    console.log(date, "changed");
    dispatch(updateDate(date));
  };

  useEffect(() => {
    dispatch(fetchUser(userId, date));
  }, [dispatch, date]);

  useEffect(() => {
    if (user) {
      let details = [
        { Name: user.name },
        { "Weight (in KG)": user.weight },
        { "Height (in CM)": user.height },
        { Sex: user.sex },
        { Age: user.age },
      ];

      setUserDetails(details);
      let date = getTodayAndThirtyDaysBefore();
      setMinDate(date["thirtyDaysBefore"]);
      setMaxDate(date["today"]);
    }
  }, [user, date]);

  useEffect(() => {
    dispatch(fetchFoods());
    dispatch(fetchActivities());
  }, []);

  const handleAddCalorieInModel = async () => {
    await dispatch(showAddUserCalorieInModel());
  };

  const handleAddCalorieOutModel = async () => {
    console.log("from compo");
    await dispatch(showAddUserCalorieOutModel());
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />

      <Card>
        <CardContent>
          {/* User details */}
          <Grid container justifyContent="space-between" mt={1}>
            <Typography
              mb={4}
              variant="h6"
              noWrap
              component="div"
              className="text-blue"
              sx={{ fontWeight: "bold" }}
            >
              Users Details
            </Typography>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Key</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userDetails.map((userDetail, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {Object.entries(userDetail)[0][0]}
                        </TableCell>
                        <TableCell>
                          {Object.entries(userDetail)[0][1]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container justifyContent="center">
                <Avatar
                  sx={{
                    width: 260,
                    height: 260,
                    backgroundColor: "#1976d2",
                    marginTop: "30px",
                  }}
                >
                  PROFILE
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
          {/* Select date */}
          <Grid container justifyContent="flex-end" mt={4}>
            <Grid item xs={3}>
              <TextField
                type="date"
                sx={{ width: "100%" }}
                variant="outlined"
                value={date}
                onChange={(e) => handleDate(e.target.value)}
                inputProps={{
                  min: minDate, // Set the minimum date
                  max: maxDate, // Set the maximum date
                }}
              />
            </Grid>
            <Grid item>
              <Chip
                color="primary"
                label="Select Date"
                sx={{
                  marginLeft: "8px",
                  padding: "27px 10px",
                  borderRadius: "30px",
                }}
              />
            </Grid>
          </Grid>
          {/* Calries In */}
          <Grid container justifyContent="space-between" mt={4}>
            <Typography
              mb={4}
              variant="h6"
              noWrap
              component="div"
              className="text-blue"
            >
              Calories In
            </Typography>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "2rem" }}
                onClick={handleAddCalorieInModel}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Portion</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Calories
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user &&
                    user.hasOwnProperty("caloriesIn") &&
                    user.caloriesIn.length ? (
                      user.caloriesIn.map((calorie, index) => (
                        <TableRow key={index}>
                          <TableCell>{calorie.foodId._id}</TableCell>
                          <TableCell>{calorie.foodId.name}</TableCell>
                          <TableCell>{calorie.portion}</TableCell>
                          <TableCell>{calorie.time}</TableCell>
                          <TableCell>
                            <Chip
                              color="primary"
                              label={calorie.foodId.calories}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={5}>
                          <Typography variant="body1">
                            No Calories In found.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {user &&
                      user.caloriesIn &&
                      user.netCalories &&
                      user.caloriesIn.length > 0 &&
                      user.netCalories.length > 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            sx={{ fontWeight: "bold", textAlign: "left" }}
                          >
                            Total Calories
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {user.netCalories[0].totalCalories}
                          </TableCell>
                        </TableRow>
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          {/* Calries Out */}
          <Grid container justifyContent="space-between" mt={4}>
            <Typography
              mb={4}
              variant="h6"
              noWrap
              component="div"
              className="text-blue"
            >
              Calories Out
            </Typography>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "2rem" }}
                onClick={handleAddCalorieOutModel}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Activity
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Duration
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Calorie Burnt
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user &&
                    user.hasOwnProperty("caloriesOut") &&
                    user.caloriesOut.length ? (
                      user.caloriesOut.map((calorie, index) => (
                        <TableRow key={index}>
                          <TableCell>{calorie.activityId._id}</TableCell>
                          <TableCell>{calorie.activityId.activity}</TableCell>
                          <TableCell>{calorie.duration}</TableCell>
                          <TableCell>
                            <Chip color="primary" label={calorie.caloryBurnt} />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          <Typography variant="body1">
                            No Calories Out found.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {user &&
                      user.caloriesOut &&
                      user.netCalories &&
                      user.caloriesOut.length > 0 &&
                      user.netCalories.length > 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            sx={{ fontWeight: "bold", textAlign: "left" }}
                          >
                            BMR Calories
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {user.netCalories[0].bmrCalories}
                          </TableCell>
                        </TableRow>
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          {/* Net calories */}
          <Grid container justifyContent="space-between" mt={4}>
            <Typography
              mb={4}
              variant="h6"
              noWrap
              component="div"
              className="text-blue"
            >
              Net Calories
            </Typography>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Total Calories
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        BMR Calories
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Difference
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user &&
                    user.hasOwnProperty("netCalories") &&
                    user.netCalories.length ? (
                      user.netCalories.map((netCalorie, index) => (
                        <TableRow key={index}>
                          <TableCell>{netCalorie.totalCalories}</TableCell>
                          <TableCell>{netCalorie.bmrCalories}</TableCell>
                          <TableCell>{netCalorie.difference}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          <Typography variant="body1">
                            No Net Calories found.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetailComponent;
