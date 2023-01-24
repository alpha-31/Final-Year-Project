import './App.css';
import './Components/WelcomeSite/styles/index.css' ;
import 'antd/dist/antd.min.css'
import styled from 'styled-components';
import Starter from './Components/WelcomeSite/sections/Starter';
import About from './Components/WelcomeSite/sections/About';
import Why from './Components/WelcomeSite/sections/Why';
import Testimonials from './Components/WelcomeSite/sections/Testimonials';
import Footer from './Components/WelcomeSite/sections/Footer';
import ScrollToTop from './Components/WelcomeSite/components/ScrollToTop';
import { motion } from 'framer-motion';
function App() {
  return (
   <motion.div initial="hidden" animate="show" >
   <ScrollToTop/>
   <Starter/>
   <About/>
   <Why/>
   <Testimonials/>
   <Footer/>
   </motion.div>
  );
}

export default App;
