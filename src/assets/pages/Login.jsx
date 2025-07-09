import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../config/constant";
import Lottie from "lottie-react";
import successAnimation from "../Animations/loggedin.json";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      userEmail: email,
      userPassword: password,
    };

    try {
      const response = await axios.post(URLS.userLogin, loginData);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setFailed(false);
      setLoginSuccess(true);
      setTimeout(() => window.location.href = "/", 2000);
    } catch (err) {
      console.error("Login failed", err);
      setFailed(true);
    }
  };

  return (
    <div className='login'>
      <div className='login__container'>
        {loginSuccess ? (
          <div className='login__success'>
            <Lottie
              animationData={successAnimation}
              loop={false}
              style={{ height: 150 }}
            />
            <h2 className='login__message'>Login Successful!</h2>
          </div>
        ) : (
          <>
            <h2 className='login__title'>User Login</h2>
            <form className='login__form' onSubmit={handleLogin}>
              <label className='login__label'>Email</label>
              <input
                type='email'
                className='login__input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className='login__label'>Password</label>
              <input
                type='password'
                className='login__input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {failed && (
                <div className='login__error'>
                  <span>Username or Password incorrect</span>
                </div>
              )}
              <button type='submit' className='login__button'>
                Login
              </button>

              <span onClick={() => navigate("/create-user")}>
                Don't have an account? Click here.
              </span>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
