import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import AnimalsList from "./components/AnimalsList";
import Donations from "./components/Donations/DonationsList";
import Announcements from "./components/Announcements";
import NewEntry from "./components/NewEntry";
import Navigation from "./components/Navigation";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/animalsList" element={<AnimalsList />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/newentry" element={<NewEntry />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
