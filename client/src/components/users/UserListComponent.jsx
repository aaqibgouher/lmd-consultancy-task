import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WeightIcon from "@mui/icons-material/FitnessCenter";
import HeighIcon from "@mui/icons-material/Height";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../../actions/users/userActions";
import AddUserModelComponent from "../helper/AddUserModelComponent";
import {
  showAddUserModel,
  showSnackbar,
} from "../../actions/helpers/helperActions";

const UserListComponent = () => {
  let users = useSelector((state) => state.userReducers.users);
  let dispatch = useDispatch();

  const deleteUserHandler = async (userId) => {
    let res = await dispatch(deleteUser(userId));
    // refreshing the users
    await dispatch(fetchUsers());
  };

  const handleAddUserModel = async () => {
    await dispatch(showAddUserModel());
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />

      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" mt={1}>
            <Grid item>
              <Typography
                mb={4}
                variant="h6"
                noWrap
                component="div"
                className="text-blue"
                sx={{ fontWeight: "bold" }}
              >
                Users List
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "2rem" }}
                onClick={handleAddUserModel}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>

          <Divider />
          {users.length > 0 ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Weight (in KG)
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Height (in CM)
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Sex
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link
                          className="no-text-underline text-blue"
                          to={`/${user._id}`}
                        >
                          {user._id}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          className="no-text-underline text-blue"
                          to={`/${user._id}`}
                        >
                          {user.name}
                        </Link>
                      </TableCell>

                      <TableCell align="right">
                        <Chip
                          icon={<WeightIcon />}
                          color="primary"
                          label={user.weight}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          icon={<HeighIcon />}
                          color="primary"
                          label={user.height}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          icon={
                            user.sex === "male" ? <ManIcon /> : <WomanIcon />
                          }
                          color="primary"
                          label={user.sex}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ borderRadius: "2rem" }}
                          onClick={() => deleteUserHandler(user._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ textAlign: "center" }} mt={2} variant="body1">
              No users found.
            </Typography>
          )}
          <Divider />
          {/* <AddUserModelComponent /> */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserListComponent;
