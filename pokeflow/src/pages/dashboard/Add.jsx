import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Workflow from '../../components/workflow/workflow'



const AddDashboard = () => {
    return (
        <div className='w-[100vw] h-[100vh] flex gap-0 items-center'>
            <Sidebar />
            <div className='w-[85%] h-[100vh] bg-black px-20 py-10'>
                <div className='w-[100%] mb-10- flex justify-start text-3xl items-center text-white'>
                    Add Workflow
                </div>
                <Workflow />

            </div>
        </div>
    )
}

export default AddDashboard