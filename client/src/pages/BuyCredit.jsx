import { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../contexts/AppContext'
import {motion} from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BuyCredit = () => {
  const {user, backendUrl, loadCredits, token, setShowLogin} = useContext(AppContext);
  const navigate = useNavigate();
  const initPay = async( order) =>{
      const options = {
        key : import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount ,
        currency : order.currency,
        name: "Credits Payment",
        order_id : order.id,
        receipt: order.receipt,
        handler: async (response) => {
          try {
            const {data} = await axios.post(backendUrl+ "/api/user/verify-razor", response, {headers: {token}})
            if(data.success) {
              loadCredits();
              navigate("/")
              toast.success("Credit Added");
            }
          } catch (error) {
            toast.error(error.message)
          }
        }
      }
      const rzp = new window.Razorpay(options) 
      rzp.open();
  }

  const paymentRazorpay = async (planId) => {
   
    try {
      if(!user) {
        setShowLogin(true)
      }
      const {data} = await axios.post(backendUrl+ "/api/user/pay-razor" , {planId}, {headers: {token}});
      console.log(data);
      if(data.success) {
        console.log("initpay called ")
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <motion.div initial={{opacity:0.2, y: 100}} transition= {{duration:1}} whileInView= {{opacity:1, y:0}} viewport = {{once:true}} className='text-center pt-14 mb-10 min-h-[80vh]'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <p className='text-center text-3xl font-medium mb-6 sm:mb-10' >Choose the plan</p>

      <div className='flex flex-wrap text-left justify-center gap-6'>
        {plans.map((plans, index)=>(
          <div key={index} className= ' border-amber-50 bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <div className='flex flex-col '>
              <img src= {assets.logo_icon} alt=''width={40}/>
              <p className='text-gray-600 mt-3 mb-1 font-semibold'>{plans.id}</p>
              <p className='text-gray-600 text-sm'>{plans.desc}</p>
              <p className='text-gray-600 mt-6'> <span className='text-3xl font-medium'>$ {plans.price}</span>/ {plans.credits} credits</p>
              <button onClick={()=>paymentRazorpay(plans.id)} className='bg-gray-800 items-center text-white rounded-md gap-2 px-12 py-3 mt-8 '>{user? "Purchase" : "Get Started"}</button>
            </div>
          </div>
        ))}

      </div>
    </motion.div>
  )
}

export default BuyCredit