import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { delay, motion } from "motion/react"
import { AppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate();

  const clickBtn = () => {
    if(user){
      navigate("/result");
    }else{
      setShowLogin(true);
    }
  }

  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20' initial={{opacity:0.2, y: 100}} transition={{duration:1}} whileInView={{opacity: 1, y: 0}} viewport={{once:true}}>

        <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500' initial={{opacity:0, y: -20}} animate= {{opacity:1, y:0}} transition={{delay:0.2,duration:0.8}} >
            <p>Best text to Image generator </p>
            <img src={assets.star_icon} alt=''></img>
        </motion.div>

        <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'> Turn Text to <span className='text-blue-600' initial= {{opacity:0}} animate= {{opacity:1}} transition= {{delay: 0.4, duration: 2}}>Image</span>, in seconds </motion.h1>

        <motion.p className='text-center max-w-xl mt-5 '  initial= {{opacity:0, y:20 }} animate= {{opacity:1, y:0}} transition= {{delay: 0.6, duration: 0.8}}> Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</motion.p>

        <motion.button  onClick ={clickBtn} className='gap-2 flex items-center rounded-full bg-black sm:text-lg text-white w-auto mt-8 px-12 py-2.5 ' whileHover= {{scale: 1.05}} whileTap = {{scale: 0.95}} initial= {{opacity: 0}} animate= {{opacity: 1}} transition= {{default: {duration: 0.5 }, opacity: {delay: 0.8, duration: 1}}}>
            Generate Images
            <img className='h-6' src={assets.star_group} alt=''></img>
        </motion.button>
 
        <motion.div className='flex flex-wrap justify-center mt-16 gap-3' initial= {{opacity:0}} animate = {{opacity: 1}} transition = {{delay:1, duration: 1}}>
            {Array(6).fill("").map((item, index)=>(
              <motion.img className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10" whileHover = {{scale: 1.05, duration:0.1}}src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2}alt='' width={70} key={index}/>
            ))}
        </motion.div>
          <motion.p className='text-neutral-500 mt-2 ' initial ={{opacity: 0}} animate ={{opacity:1}} transition={{delay: 1.2, duration: 0.8}}>Generated Images from Imagify</motion.p>
    </motion.div>
  )
}

export default Header