import React from 'react';
import './welcome.css';
import { useNavigate } from 'react-router-dom';

//redux
import { useDispatch,useSelector } from 'react-redux';
import{reset,logout} from "../features/auth/authSlice";
import { useEffect } from 'react';

//Google
import { GoogleLogout } from '@leecheuk/react-google-login';



const Welcome = () => {

    const {user,error}=useSelector((state)=>state.auth);
    // console.log(error)
    
    // const {fname}=user;
    console.log(user);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const clientId =
    "893692184912-2pp0js5fcqfmr8ut7legbd7kto428590.apps.googleusercontent.com";
    
    useEffect(()=>{
        if(error){
            console.log(error);
        }
        if(!user){
            navigate("/")
        }
        return ()=>{
            dispatch(reset());
        };
    },[error,user,navigate,dispatch]);
    
    const handleLogout=()=>{
        dispatch(logout());
        navigate("/")
    };
    const username = user ? user.fname ? user.fname : user.result.user.fname :null;
    console.log(username);

  return (
    <section className='welcome-container'>
      <h1 className='welcome-header'>
        {/* <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}> */}
        <img src="./t.png
        " style={{width:"200px",marginTop:20,marginLeft:70}} alt='logo'/>
        <h5>Welcome <span>{username}!</span> </h5>
        
    {/* </div> */}
    <button className='logout-button' onClick={handleLogout}>
        Log Out
      </button>
      <GoogleLogout clientId={clientId} buttonText="Log Out" onLogoutSuccess={handleLogout}/>
      </h1>
      
    </section>
  )
}

export default Welcome
