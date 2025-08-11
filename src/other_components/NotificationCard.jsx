import React from 'react';
const NotificationCard = React.forwardRef(({animate, onAnimationEnd}, ref) => {
     const notification = Array.from({ length: 5 }, (_, i) => ({
        notifData: `Your excuse for IT Week has been approved by the council.`,
        date: `July 19, 2025 3:00pm`,
    })); 
    return(
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`${animate} w-85 h-85 rounded-[10px] bg-white border-1 border-black shadow-[2px_2px_grey] z-80 absolute right-10 top-[60px] `} >
            <div className='mt-3 px-5 flex justify-between'>
                <h2 className='text-xl font-bold text-[#621668] font-[family-name:Helvetica]'>Notifications</h2>
                <button className='text-sm text-[#666666]'>Clear All</button>
            </div>
            <div className='px-5 flex gap-5 mt-3'>
                <button className='text-sm font-[family-name:arial] font-semibold'>All</button>
                <button className='text-sm font-[family-name:arial] font-semibold'>Unread</button>
            </div>
            <div className='overflow-y-scroll h-55 px-5 pt-2 '>
                {notification.map((data, i) =>
                    <div key={i} className='hover:bg-[#e1dede] rounded-md text-sm flex items-center gap-5 p-2'>
                        <span><i className="fa-solid fa-circle text-[8px]"></i></span>
                        <span>{data.notifData} <br /> <span className='text-[10px]'>July 19, 2025 3:00pm</span></span>
                    </div>
                )}
                
            </div>
            <div className='mt-2 px-6'>
                <button className='bg-[#b8b2b2c0] w-full py-1 rounded-md text-sm'>View All Notifications</button>
            </div>
        </div>
    );

});
export default NotificationCard;