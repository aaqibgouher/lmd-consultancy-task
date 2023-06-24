import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import UserPage from "./pages/UserPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import AddUserModelComponent from "./components/helper/AddUserModelComponent";
import AddUserCalorieInComponent from "./components/helper/AddUserCalorieInComponent";
import AddUserCalorieOutComponent from "./components/helper/AddUserCalorieOutComponent";
import SnackbarComponent from "./components/helper/SnackbarComponent";

function App() {
  return (
    <>
      {/* <ModelComponent /> */}
      <Router>
        {/* Models */}
        <AddUserModelComponent />
        <AddUserCalorieInComponent />
        <AddUserCalorieOutComponent />
        <SnackbarComponent />
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/:userId" element={<UserDetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
