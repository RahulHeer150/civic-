import React from 'react'
import {Link} from "react-router-dom"

const AdminPage = () => {
  return (
    <div className='max-w-screen h-screen mx-10 mt-20 p-5 bg-gray-300 rounded-xl items-center justify-center '>
      <h1 className='font-bold text-gray-800 text-4xl text-center py-5'>ALL Reported Issues</h1>
      
        <div className='w-full p-5 border-2 border-gray-500 rounded-xl flex '>
          <div className='w-1/2 px-5 py-3  flex h-15 bg-white rounded-xl '>
            <div className='h-10 w-10 rounded-full bg-blue-400'>
              img
            </div>
          <h1 className='text-center px-5 text-xl  '>
            Issue Title
          </h1>
        </div>
        <div className='w-1/2 px-10 py-4 justify-end items-end mx-20'>
          <Link className="bg-blue-400 h-10 w-30 px-10 py-3 text-lg text-white font-semibold rounded-xl gap-10 mr-5">
            Resolve
          </Link>
          <Link  to="/issues/:id" className="bg-gray-400 h-10 w-30 px-10 py-3 text-lg text-white font-semibold rounded-xl">
            View
          </Link>

        </div>

        </div>

      </div>
  )
}


export default AdminPage