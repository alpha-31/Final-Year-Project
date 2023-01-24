import React from "react";
import Title from "../components/Title";
import { useScroll } from "../components/useScroll";
import { GoPlay } from "react-icons/go";
import { motion } from "framer-motion";
import "../styles/sections/Why.scss";
import {
  topContainerAnimation,
  videoAnimation,
  reasonsAnimation,
} from "../utils/Animations";

function Why() {
  const [element, controls] = useScroll();

  return (
    <div className="why-container" id="services" ref={element}>
      <div className="container">
        <motion.div
          className="top"
          variants={topContainerAnimation}
          animate={controls}
          transition={{
            duration: 1,
          }}
        >
          <Title title="Why US?" color="pink" lineCenter={true} />
          <div className="subTitle">
            <p>
              Always stay updated with the technologies thus we help our clients
              by giving the best solutions for their needs.
            </p>
          </div>
        </motion.div>
        <div className="content">
          <motion.div
            variants={videoAnimation}
            animate={controls}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <div className="video">
              <GoPlay />
            </div>
          </motion.div>
          <motion.div
            className="reasons"
            variants={reasonsAnimation}
            animate={controls}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <ul>
              <li>No Need to do Manual Work on small things</li>
              <li>
                No Need to spend hours on a thing which can be automated
                by using Machine learning
              </li>
              <li>Automate your traffic model calibration </li>
              <li>Faster and efficient way to get your work done</li>
              <li>Get the most detailed and accurate traffic events for traffic control systems</li>
              
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Why;
