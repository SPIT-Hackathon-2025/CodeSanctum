import React from 'react'
import img from '../../assets/image.png'
import { HiChartPie, } from "react-icons/hi";
import { MdInventory } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import './sidebar.css'

const Sidebar = () => {
    return (
        <div className='sidebar w-[20%] h-[100vh] text-white'>
            <a href="/ ">
                <img src={img} className="w-[70%]" alt="" />
            </a>
            <div className='dash-items'>
                <div className='dash-1'>
                    <div className='content'>
                        <HiChartPie size={25} />
                        <a href="/dashboard">Dashboard</a>
                    </div>
                    <FaAngleRight className='pt-[6px] items-end' size={26} />
                </div>
                <div className='dash-1'>
                    <div className='content'>
                        <MdInventory size={25} />
                        <a href="/workflow">My Inventory</a>
                    </div>
                    <FaAngleRight className='pt-[6px]' size={26} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar