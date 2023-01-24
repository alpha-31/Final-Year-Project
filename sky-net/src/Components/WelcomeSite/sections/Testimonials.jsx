import React from "react";
import Title from "../components/Title";
import Testimonial from "../components/Testimonial";
import { useScroll } from "../components/useScroll";
import { motion } from "framer-motion";
import "../styles/sections/Testimonials.scss";
import { textAnimation, cardAnimation } from "../utils/Animations";

export default function Testimonials() {
  const [element, controls] = useScroll();
  
  return (
    
    
    <div className="testimonials-container" id="testimonial" ref={element}>
      <div className="container">
        <motion.div
          className="title-container"
          variants={textAnimation}
          animate={controls}
          transition={{
            duration: 1,
          }}
        >
          <Title title="Testimonials" color="blue" lineCenter={true} />
          <p>See what our clients are saying about us.</p>
        </motion.div>
        <div className="testimonials" >
          <Testimonial 
            content="I have to agree, that there was way less stress on projects with SkyNet comparing to 
            other solutions or human counters, and I'm sure this will be our preferable way in the future..."
            name="Anton Rabizo"
            designation="Co-Founder IDOM"
            variants={cardAnimation}
            animate={controls}
          />
          <Testimonial
            content="To us, SkyNet Video Insights is by far the most advanced solution offered on the market.
            It is incredible to think that some months ago we didn’t have this in the past.
            "
            name="Jan Rajman, SPM"
            designation="CzechConsult"
            variants={cardAnimation}
            animate={controls}
          />
          <Testimonial
            content="The ability to offer the added value in the form of visual representations as well as 
            reducing data turnaround times with automated analysis via SkyNet."
            name="Jiri Kocourek"
            designation="Founder"
            variants={cardAnimation}
            animate={controls}
          />
        </div>
      </div>
    </div>
  );
}
