import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import AccomplishPic from '../assets/general.jpg';
import AccomplishmentCard from '../other_components/AccomplishmentCard.jsx';
import AddAccomplishmentCard from '../other_components/AddAccomplishmentCard.jsx';
import it from '../assets/it.png';
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
             <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddAccomplishmentCard ref={ref} onAnimationEnd={addAccomplishment.handleEnd} animate={addAccomplishment.animation} onClose={() => addAccomplishment.setAnimation("fade-out")} />
            </>
        )
           
        }
            <CITHeader logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className="mt-[110px] relative lg:flex lg:justify-between lg:px-[30px] lg:ml-[290px]">
                    <h2 className="text-[26px] font-semibold ml-[20px]">Accomplishment Report</h2>
                    <button onClick={addAccomplishment.toggle} className='absolute right-[30px] bg-white border-1 border-[#000] p-[5px] text-[14px] font-semibold shadow-[2px_2px_grey] rounded-[5px]'><i className="fa-solid fa-plus"></i>Add Accomplishment</button>
                </div>
                <div className="lg:ml-[280px] flex flex-wrap items-center justify-center gap-4 px-[25px] lg:mt-[10px] mt-[40px]">
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