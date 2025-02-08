import React from 'react'
import img from '../../assets/image.png'
import {HiChartPie,} from "react-icons/hi";
import './sidebar.css'

const Sidebar = () => {
    return (
        <div className='sidebar w-[15%] h-[100vh] text-white'>
            <img src={img} className='w-[70%]' alt="" />
            <div className='dash-items'>
            <div>
                <HiChartPie/>
            <a href="/dashboard">Dashboard</a>
            </div>
            </div>
        </div>
    )
}

export default Sidebar