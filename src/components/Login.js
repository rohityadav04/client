import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./combine.css";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authAction";
import { reset, googleLogIn } from "../features/auth/authSlice";

//google login
import { GoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from 'gapi-script';//help to connect with google api

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();
  const dispatch = useDispatch();
  const { success, user } = useSelector((state) => state.auth);

  console.log(success);
  console.log(user);

  const clientId =
    "893692184912-2pp0js5fcqfmr8ut7legbd7kto428590.apps.googleusercontent.com";

  useEffect(() => {
    if (user) {
      history("/dash");
    }
  }, []);

  useEffect(() => {

  const initClient=()=>{
    gapi.client.init({
      clientId:clientId,
      scope:""
    })
  }
  gapi.load("client:auth2",initClient);

    if (success && user) {
      history("/dash");
    }
    return () => {
      dispatch(reset());
    };
  }, [success, user, history, dispatch]);

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      // console.log("user login succesfully done");

      // const data = await fetch("http://localhost:3004/login",{
      //     method:"POST",
      //     headers:{
      //         "Content-Type":"application/json"
      //     },
      //     body:JSON.stringify({
      //          email, password
      //     })
      // });

      // const res = await data.json();
      // //  console.log(res);

      // if(res.status === 201){
      //     localStorage.setItem("usersdatatoken",res.result.token);
      //     history("/dash")
      //     setInpval({...inpval,email:"",password:""});
      // }
      dispatch(loginUser(inpval));
    }
  };

  const onGoogleSuccess=(res)=>{
    console.log("Success",res)
     dispatch(googleLogIn({fname:res.profileObj.name,email:res.profileObj.email}))
  }

  const onGoogleFailure=(err)=>{
    console.log("Error",err)
  }

  

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={inpval.email}
                onChange={setVal}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginuser}>
              Login
              
            </button>
            
            <p>
              <button className="btn2">
              <GoogleLogin
              clientId="893692184912-2pp0js5fcqfmr8ut7legbd7kto428590.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
              </button>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>{" "}
            </p>
            <p style={{ color: "black", fontWeight: "bold" }}>
              Forgot Password <NavLink to="/password-reset">Click Here</NavLink>
              
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Login;
