import React from 'react'

const About = () => {
  return (
    <div className='w-[90%] mx-auto   mt-10 font-roboto bg-white rounded-2xl lg:rounded-3xl  shadow-sm'>
        <div className='text-center mt-10 py-10 md:py-16'>
            <h1 className='lg:text-4xl md:text-3xl text-2xl font-bold font-roboto'>What We Do</h1>
            <p className='text-sm lg:w-2/5 sm:w-3/4 w-[87%] leading-[22px] mx-auto mt-2 text-gray-600'>Simplifying the journey of buying, selling, and 
            renting properties. Our expert team provides comprehensive
             real estate solutions tailored to your needs
           </p>
           <div className='h-[2px] bg-green-500 w-12 mt-6 mx-auto'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2  custom-range:grid-cols-2
        lg:grid-cols-4 pb-14  md:mb-6 md:px-6 px-4 lg:gap-6 gap-4 md:gap-12  '>
            <div className='space-y-4 lg:p-4  '>
                <h3 className='text-green-500'>01</h3>
                <h3 className='lg:text-[26px] md:text-[20px] text-[18px] font-bold'>Property Sales</h3>
                <p className='text-[16px]  leading-[22px] text-gray-600 '>
                Find your dream home with Real Estate - our expert team 
                will guide you through the process and ensure a smooth transaction.</p>
            </div>
            <div className='space-y-2 lg:p-4'>
                <h3 className='text-green-500'>02</h3>
                <h3 className='lg:text-[26px] md:text-[20px] text-[18px] font-bold'>Property Rentals</h3>
                <p className='text-[16px]  leading-[22px] text-gray-600 '>
                Find your dream rental property with Real Estate, offering a
                 variety of options to suit your needs and preferences.
                </p>
            </div>
            <div className='space-y-2 lg:p-4'>
                <h3 className='text-green-500'>03</h3>
                <h3 className='lg:text-[26px] md:text-[20px] text-[18px] font-bold'>Property Management</h3>
                <p className='text-[16px]  leading-[22px] text-gray-600 '>
                Trust Real Estate to handle the day-to-day management of your 
                property, maximizing its value and minimizing your stress.
                </p>
            </div>
            <div className='space-y-2 lg:p-4'>
                <h3 className='text-green-500'>04</h3>
                <h3 className='lg:text-[26px] md:text-[20px] text-[18px] font-bold'>Lucrative Investments</h3>
                <p className='text-[16px]  leading-[22px] text-gray-600 '>
                Real Estate presents lucrative investment opportunities in the real estate market, providing high returns on investments.</p>
            </div>

        </div>

    </div>
  )
}

export default About