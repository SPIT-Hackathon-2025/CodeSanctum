
import './home.css';
import Lottie from "lottie-react";
import animation from "./landingAnimation.json"
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect';

const borderAnimation = {
    // borderImage: [
    //     "linear-gradient(90deg, #FFFFFF, #000000, #FFFFFF, #000000) 1",
    //     "linear-gradient(180deg, #FFFFFF, #000000, #FFFFFF, #000000) 1",
    //     "linear-gradient(270deg, #FFFFFF, #000000, #FFFFFF, #000000) 1",
    //     "linear-gradient(360deg, #FFFFFF, #000000, #FFFFFF, #000000) 1"
    // ],
    // borderImage: [
    //   "linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853) 1",
    //   "linear-gradient(180deg, #4285F4, #EA4335, #FBBC05, #34A853) 1",
    //   "linear-gradient(270deg, #4285F4, #EA4335, #FBBC05, #34A853) 1",
    //   "linear-gradient(360deg, #4285F4, #EA4335, #FBBC05, #34A853) 1"
    // ],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
    }
};

function Home() {
    return (
        <div className="App">
            <motion.div
                //   animate={borderAnimation} 
                className="navbar">
                <img src="../src/assets/image.png" className="logo opacity-80" alt="Reelx Logo" />
                {/* <a href="/dashboard" className='poke px-5'>Login</a> */}
                <a href="/dashboard" className='dash poke px-10 py-3  border border-gray-300 rounded-lg mr-2'>Dashboard</a>

            </motion.div>
            <div className="main">
                <div className='main-text'>
                    <h1 className='poke'>PokeFlow</h1>

                    <div className="typewriter-container ">
                        <Typewriter
                            options={{
                                strings: ['Automate Your Workflows', 'No Code Needed!'],
                                autoStart: true,
                                loop: true,
                                delay: 50,
                            }}
                        />
                    </div>
                    <p className='desc'>Connect your favorite apps, automate tasks, and save hours of manual work all with a simple drag-and-drop interface.</p>
                </div>
                <motion.div className='lottie'
                // animate={borderAnimation}
                >
                    <Lottie animationData={animation} loop={true} />
                </motion.div>
            </div>
        </div>
    );
}

export default Home;
