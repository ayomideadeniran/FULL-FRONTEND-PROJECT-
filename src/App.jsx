import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./Components/Register";
import Login from "./Components/Login";
import Form from "./Components/Form"
import ImageFetch from "./Components/ImageFetch"
import UploadImage from "./Components/ImageUpload";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/ImageFetch" element={<ImageFetch />} />
            <Route path="/ImageUpload" element={<UploadImage />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;






