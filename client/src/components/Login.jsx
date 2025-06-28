import { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import {motion} from "framer-motion"
import axios from "axios";
import {toast} from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const {setShowLogin, setToken, setUser, backendUrl} = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {
      if(state === "Login") {
        const {data} = await axios.post(backendUrl +"/api/user/login", {email, password})
          if(data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
         const {data} = await axios.post(backendUrl+"/api/user/register", {name, email, password})
          if(data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    document.body.style.overflow = "hidden";

    return(()=>{
      document.body.style.overflow = "unset";
    })
  },[])
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 z-10 bg-black/30 flex justify-center items-center backdrop-blur-sm '>
        <motion.form  onSubmit = {onSubmitHandler} initial={{opacity:0.2, y: 50}} transition= {{duration:0.3}} whileInView= {{opacity:1, y:0}} viewport = {{once:true}} className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm text-center'>Welcome back ! Please Sign in to Continue</p> 

            {state !== "Login" && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 '>
              <img src={assets.profile_icon} alt="" width={21} />
              <input onChange={e => setName(e.target.value)} value = {name} type="text" placeholder='Full Name' className='outline-none text-sm 'required/>
            </div>}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 '>
              <img src={assets.email_icon} alt="" />
              <input onChange={e => setEmail(e.target.value)} value = {email} type="email" placeholder='Email Id' className='outline-none text-sm 'required/>
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 '>
              <img src={assets.lock_icon} alt="" />
              <input onChange={e => setPassword(e.target.value)} value = {password} type="password" placeholder='Password' className='outline-none text-sm 'required/>
            </div>

            <p className='text-sm text-blue-600 w-full py-2 rounded-full'>Forgot Password</p>
            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === "Login" ? "Log in" : "Create an Account"}</button>
            {state == "Login"? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState("Signup")}>Sign up</span></p> 
            :
            <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState("Login")}>Log in</span></p>}

            <img onClick= {()=> setShowLogin(false)}src={assets.cross_icon} alt="" className='top-5 right-5 absolute cursor-pointer' />
        </motion.form>
    </div>
  )
}

export default Login