import React from 'react'

const IssueList = () => {
  return (
    <div className='flex flex-col min-h-screen pt-4 md:pt-20 bg-gray-100'>
      <div className='flex flex-grow flex-col w-full max-w-[1190px] pt-16 md:pt-0 mx-auto justify-between items-center mt-[12vh]'>
        <h1 className='text-4xl font-bold mb-8'>Issue:</h1>
        <div className='w-full px-6 lg:px-0 text-black'>
          <div className='flex flex-col gap-6 w-full max-w-3xl mx-auto text-left border-2 rounded-3xl py-10 lg:py-20 px-6 lg:px-10 shadow-2xl bg-white'>
            <div className='p-4 border-b'>
              <h2 className='text-2xl font-semibold mb-2'>Issue Title 1</h2>
              <p className='text-gray-700'>Description of the issue goes here. It provides details about the problem faced.</p>
            </div>
            <div className='p-4 border-b'>
              <h2 className='text-2xl font-semibold mb-2'>Issue Title 2</h2>
              <p className='text-gray-700'>Description of the issue goes here. It provides details about the problem faced.</p>
            </div>
            <div className='p-4 border-b'>
              <h2 className='text-2xl font-semibold mb-2'>Issue Title 3</h2>
              <p className='text-gray-700'>Description of the issue goes here. It provides details about the problem faced.</p>
            </div>
            {/* Add more issues as needed */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default IssueList