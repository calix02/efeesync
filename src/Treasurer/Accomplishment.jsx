import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import AccomplishPic from '../assets/general.jpg';
import AccomplishmentCard from '../other_components/AccomplishmentCard.jsx';
import AddAccomplishmentCard from '../other_components/AddAccomplishmentCard.jsx';
import EfeeViolet from '../assets/violetlogo.png'
import React, {useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
function CITAccomplishment(){
/* ------------------------- Animated States ----------------------------- */
    const addAccomplishment = useAnimatedToggle();
    const ref = useRef(null);
   

    return(

        <>
        {/* Add Accomplishment Card */}
        {addAccomplishment.isVisible &&(
             <>
             <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddAccomplishmentCard ref={ref} onAnimationEnd={addAccomplishment.handleEnd} animate={addAccomplishment.animation} onClose={() => addAccomplishment.setAnimation("fade-out")} />
            </>
        )
           
        }
            <CITHeader code="cit" titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className=" lg:ml-70 lg:mt-30 mt-25 relative lg:flex md:flex justify-between">
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Accomplishment Report</h2>

                    <button onClick={addAccomplishment.toggle} className=' bg-white border-1 border-[#000] cursor-pointer lg:mt-0 md:mt-0 mt-3  p-1 lg:text-sm md:text-sm text-xs font-semibold shadow-[2px_2px_grey] rounded-md'><i className="fa-solid fa-plus"></i>Add Accomplishment</button>
                </div>
                <div className="lg:ml-70 grid lg:grid-cols-2 grid-cols-1 items-center justify-center gap-6 mt-4">
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>  
                </div>
            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
       

    );
}
export default CITAccomplishment;