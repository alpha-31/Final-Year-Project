import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Title from "../components/Title";
import { useScroll } from "../components/useScroll";
import { HiLightBulb } from "react-icons/hi";
import { BsFillCalendarFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { SiGooglemessages } from "react-icons/si";
import { motion } from "framer-motion";
import "../styles/sections/About.scss";
import { reveal } from "../utils/Animations";  

function About() {
  const [element, controls] = useScroll();

  return (
    <div className="about-container" id="about" ref={element}>
      <div className="container">
        <motion.div
          className="details"
          // initial="hidden"
          animate={controls}
          variants={reveal}
          transition={{ delay: 0.1, stiffness: 300 }}
        >
          <Title title="About US" color="blue" />
          <p>
            We Believe that the manforce should used utilized in a proper day.
            Innovation and simplicity make us happy. Our mission is to help law
            enforcement agencies to achieve what they should be doing slow and inefficiently.
          </p>
          <p>
            We are excited to help our agencies to achieve their goals and to make their work easier.
          </p>
          <Button content="Why US?" />
        </motion.div>
        <div className="cards" ref={element}>
          <Card
            title="Innovative Way"
            logo={<HiLightBulb />}
            animateCustom={controls}
          />
          <Card
            title="Less Work Force"
            logo={<BsFillCalendarFill />}
            animateCustom={controls}
          />
          <Card
            title="Quick Response"
            logo={<BiSupport />}
            animateCustom={controls}
          />
          <Card
            title="Report System"
            logo={<SiGooglemessages />}
            animateCustom={controls}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
