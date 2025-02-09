import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import './dashboard.css';
import './connected-apps.css';
import { motion } from 'framer-motion';

const ConnectedApps = () => {
    const [workflows, setWorkflows] = useState([]);


    return (
        <div className='w-[100vw] h-[100vh] flex gap-0 items-center'>
            <Sidebar />
            <div className='body w-[80%] h-[100vh] px-20 py-10'>
                <div className='w-[100%] font-bold mb-10 flex justify-start items-center text-3xl text-[#F1E0C6]'>
                    Connected Applications
                </div>
                {/* Features Section */}
                <motion.div
                    className="features"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <h2 className="feature-heading">Google Suite</h2>
                    <div className="feature-container ">
                        <motion.div className="feature-card large" whileHover={{ scale: 1.1 }}>
                            <div className='flex items-center justify-center'>
                                <img src='/gmail.svg' className='h-[34px]' alt='' />
                                <h3>G-MAIL</h3>
                            </div>
                            <p>Automate email sorting, replies, and notifications.</p>
                        </motion.div>

                        <motion.div className="feature-card large" whileHover={{ scale: 1.1 }}>
                            <div className='flex items-center justify-center'>
                                <img src='/drive.svg' className='h-[34px]' alt='' />
                                <h3>DRIVE</h3>
                            </div>
                            <p> Sync, store, and manage files seamlessly</p>
                        </motion.div>

                        <motion.div className="feature-card large" whileHover={{ scale: 1.1 }}>
                            <div className='flex items-center justify-center'>
                                <img src='/sheets.svg' className='h-[34px]' alt='' />
                                <h3>SPREADSHEETS</h3>
                            </div>
                            <p>Update and analyze data in real-time.</p>
                        </motion.div>

                        <motion.div className="feature-card large" whileHover={{ scale: 1.1 }}>
                            <div className='flex items-center justify-center'>
                                <img src='/calendar.svg' className='h-[34px]' alt='' />
                                <h3>CALENDAR</h3>
                            </div>
                            <p>Schedule and track events effortlessly.</p>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default ConnectedApps;
