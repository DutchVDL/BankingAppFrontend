import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./Components/RegisterForm";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LoginForm from "./Components/LoginForm";
import { useRef, useState } from "react";
import LogoutPage from "./Components/LogoutPage";
import { Profile } from "./Components/Profile";
import { Account } from "./Components/Account";
import MainPage from "./Components/MainPage";

function App() {
  // const [userLogin, setUserLogin] = useState(false);

  const userLogin = useRef();
  console.log(userLogin);

  const [userData, setUserData] = useState("");

  const handleData = (e) => {
    setDataPromise(e).catch((error) => {
      console.error("Error setting data:", error);
    });
  };

  const setDataPromise = (data) => {
    return new Promise((resolve, reject) => {
      try {
        setUserData(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
  /////////////////////////////////////////////////////////
  //Logout button

  const logout = () => {
    // setUserLogin(true);
    userLogin.current = true;
    console.log(userLogin.current);
  };

  const login = () => {
    // setUserLogin(false);
    userLogin.curren = false;
    console.log(userLogin.current);
  };

  return (
    <BrowserRouter>
      <Navbar expand="lg" className="navbar-dark bg-dark sticky-top px-5 ">
        <Navbar.Brand as={Link} to="/">
          OnlineBankingApplication
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto my-2 my-lg-0 justify-content-end gap-3"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!userLogin.current && (
              <Link
                to="/Registration"
                className="btn btn-outline-warning  mr-3 flex-shrink-0 "
              >
                Register
              </Link>
            )}
            {!userLogin.current ? (
              <Link
                to="/Login"
                className="btn btn-outline-warning mr-3 flex-shrink-0"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/Logout"
                className="btn btn-outline-warning mr-3 flex-shrink-0"
              >
                Logout
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/Registration" element={<RegisterForm />} />
        <Route
          path="/Login"
          element={
            <LoginForm logoutHandler={logout} profileData={handleData} />
          }
        ></Route>
        <Route
          path="/Logout"
          element={<LogoutPage loginHandler={login} />}
        ></Route>

        {userLogin && (
          <Route path="/Profile" element={<Profile data={userData} />} />
        )}

        {userLogin && (
          <Route
            path="/Profile/:accountId"
            element={<Account data={userData} />}
          />
        )}
        <Route path="/" element={<MainPage />} />
      </Routes>

      <div>
        <br />
        <br />
      </div>
      <footer className="bg-dark text-white text-center  pb-2 pt-1 fixed-bottom ">
        <div className="container ">
          <p className="mb-0">
            Svanidze Giorgi &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
