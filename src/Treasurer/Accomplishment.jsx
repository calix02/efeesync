import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import AccomplishPic from '../assets/general.jpg';
import AccomplishmentCard from '../other_components/AccomplishmentCard.jsx';
import AddAccomplishmentCard from '../other_components/AddAccomplishmentCard.jsx';
import EfeeViolet from '../assets/violetlogo.png'
import React, {useRef, useState, useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
function CITAccomplishment(){
/* ------------------------- Animated States ----------------------------- */
    const addAccomplishment = useAnimatedToggle();
    const ref = useRef(null);

    const [currentUserData, setCurrentUserData] = useState([]);
        
          const fetchCurrentUser = async () => {
             try {
                 const res = await fetch("/api/users/current", {
                     credentials: "include"
                 });
                 const response = await res.json();
                 if (response.status === "success") {
                    setCurrentUserData(response.data);
                 }
             } catch (err) {
                 errorAlert("Fetch Failed");
             }
          }
          useEffect(() => {
            fetchCurrentUser();
            console.log(currentUserData);
          }, []);
   
        const hoverColors = {
            CIT: " hover:bg-[#621668]",
            COE: "hover:bg-[#020180]",
            COC: "hover:bg-[#660A0A]",
            COT: "hover:bg-[#847714]",
            ESAF: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
        };
        const hoverColor = hoverColors[currentUserData?.department_code] || "hover:bg-[#174515]";
    return(

        <>
        {/* Add Accomplishment Card */}
        {addAccomplishment.isVisible &&(
             <>
             <div className="fixed flex justify-center items-center inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                {/* Overlay */}
                <AddAccomplishmentCard ref={ref} onAnimationEnd={addAccomplishment.handleEnd} animate={addAccomplishment.animation} onClose={() => addAccomplishment.setAnimation("fade-out")} />
            </div>
            </>
        )
           
        }
            <CITHeader code={currentUserData?.department_code} titleCouncil = {currentUserData?.organization_name} abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className=" lg:ml-70 lg:mt-30 mt-25 relative lg:flex md:flex justify-between">
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Accomplishment Report</h2>

                    <button onClick={addAccomplishment.toggle} className={` ${hoverColor} bg-white border-1 border-[#000] cursor-pointer lg:mt-0 md:mt-0 mt-3  hover:text-white transition duration-200 flex gap-1 hover:scale-105 items-center justify-center  p-1 lg:text-sm md:text-sm text-xs font-semibold shadow-[2px_2px_grey] rounded-md`}><i className="fa-solid fa-plus"></i>Add Accomplishment</button>
                </div>
                <div className="lg:ml-70 grid lg:grid-cols-2 grid-cols-1 items-center justify-center gap-6 mt-4">
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>  
                </div>
            </div>
            <div className='hidden lg:block'>
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.department_code} />
            </div>
        </>
       

    );
}
export default CITAccomplishment;