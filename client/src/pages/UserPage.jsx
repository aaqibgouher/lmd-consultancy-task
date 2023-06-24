import React from "react";
import AppLayout from "../layouts/AppLayout";
import UserListComponent from "../components/users/UserListComponent";

const UserPage = () => {
  return (
    <AppLayout>
      <UserListComponent />
    </AppLayout>
  );
};

export default UserPage;
