import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const PasswordReset = () => {

const [email,setEmail]=useState("");

const [message,setMessage]=useState("");

const setVal=(e)=>{
    setEmail(e.target.value)
    console.log(email)
}

const sendLink=async(e)=>{
    e.preventDefault();

    if(email===""){
        toast.error("email is required!",{
            position:"top-center"
        });
    }else if (!email.includes("@")){
        toast.warning("includes @ in your email",{
            position:"top-center"
        });
    }else{

    }
}

  return (
    <>
      <section>
        <div className='form_data'>
            <div className='form_heading'>
                <h1>Enter Your Email</h1>
            </div>
            {message ? <p style={{color:"green",fontWeight:"bold"}}>Password reset link send Successfully in Your Email</p>:""}
            <form>
                <div className='form_input'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" value={email} onChange={setVal} name="email" id='email' placeholder='Enter Your Email Address'/>
                </div>

                <button className='btn' onClick={sendLink}>Send</button>
            </form>
            <ToastContainer/>
        </div>
      </section>
    </>
  )
}

export default PasswordReset
