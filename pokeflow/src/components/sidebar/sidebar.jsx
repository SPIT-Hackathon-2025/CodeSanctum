import React from 'react'
import img from '../../assets/image.png'
import { HiChartPie, } from "react-icons/hi";
import { MdInventory } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import './sidebar.css'

const Sidebar = () => {
    return (
        <div className='sidebar w-[20%] h-[100vh] text-white'>
            <img src={img} className="w-[70%] items-center" alt="" />
            <div className='dash-items'>
                <a href="/dashboard" className='dash-1'>
                    <div className='content'>
                        <HiChartPie size={25} />
                        Dashboard
                    </div>
                    <FaAngleRight className='pt-[6px] items-end' size={26} />
                </a>
                <a href="/dashboard" className='dash-1'>
                    <div className='content'>
                        <MdInventory size={25} />
                        My Inventory
                    </div>
                    <FaAngleRight className='pt-[6px]' size={26} />
                </a>
                <a href="/dashboard" className='dash-1'>
                    <div className='content'>
                        < IoMdMail size={24} />
                        Mail
                    </div>
                    <FaAngleRight className='pt-[6px]' size={26} />
                </a>
            </div>
        </div>
    )
}

export default Sidebar