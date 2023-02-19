import React from 'react';
import  MainImage  from '../../../assets/images/main.jpg';
import '../styles/sections/Starter.scss';
import {GoPlay} from "react-icons/go";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import {motion} from 'framer-motion';
import {headerAnimation , imageAnimation} from '../utils/Animations';
import { useScroll } from "../components/useScroll";


function Starter() {
  const [element, controls] = useScroll();
  return (
    <div className="main-container" ref={element}>
      <Navbar />
        <div className="container">
          <motion.div className='content' 
          variants={headerAnimation} 
          animate={controls} 
          transition={{delay:0.2,type:"tween"}}>
            <h1> A Web application helping Law enforcement Agencies against car theft </h1>
            <p>
                This web application will include all the thing to help us in order to reduce
                manpower wasted in searching for stolen cars and also to reduce the time taken to find the stolen car.
                
            </p>
          
            <div className='button-container'>
            <Button content="Watch Video" icon={<GoPlay />} />
              <Button
                color="pink"
                content="Request A Demo"
                icon={<HiOutlineArrowNarrowRight />}/>
            </div>
          </motion.div> 
          <motion.div className='image'
          variants={imageAnimation}
          animate={controls} 
          transition={{delay:0.2,type:"tween"}}>
            <img  src={MainImage} alt="main-image" />
        </motion.div>
        </div>
        
    </div>
  )
}

export default Starter