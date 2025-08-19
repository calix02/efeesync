import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import ExcuseStatusCard from "../student_components/ExcuseStatusCard.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import React, {useRef} from 'react';
import SendExcuse from "../student_components/SendExcuse.jsx";
import EditExcuse from "../student_components/EditExcuse.jsx";
import Letter from '../student_components/Letter.jsx';
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import it from '../assets/it.png';
import '../animate.css';


function ExcuseLetter(){
/* ------------------------- Animated States ----------------------------- */
    const sendExcuse = useAnimatedToggle();
    const letter = useAnimatedToggle();
    const editExcuse = useAnimatedToggle();

    const sendRef = useRef(null);
    const letterRef = useRef(null);
    const editRef = useRef(null);


    

    return(
        <>
        {sendExcuse.isVisible &&(
            <>
            {/* Send Excuse */}
            <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                {/* Overlay */}
            </div>
                <SendExcuse ref={sendRef} onAnimationEnd={sendExcuse.handleEnd} onClose={()=> sendExcuse.setAnimation("fade-out")} animate={sendExcuse.animation} />  
            </>
        )      
        }

        {letter.isVisible &&(
            <>
            <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                {/* Overlay */}
            </div>
            <Letter ref={letterRef} onAnimationEnd={letter.handleEnd} onClose={() => letter.setAnimation("fade-out")} animate={letter.animation} />
        </>

        )
        

        }
         {editExcuse.isVisible &&(
            <>
            <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                {/* Overlay */}
            </div>
            <EditExcuse ref={editRef} onAnimationEnd={editExcuse.handleEnd} onClose={() => editExcuse.setAnimation("fade-out")} animate={editExcuse.animation} />
            </>

         )
        

        }
        <Header code="cit" logoCouncil={it} titleCouncil = "College of Information Technology"/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70 flex justify-between px-6">
                <h2 className="text-2xl font-semibold ">Excuse Letter Request</h2>
                <button onClick={sendExcuse.toggle} className="w-45 h-10 rounded-lg shadow-[2px_2px_3px_grey] text-white bg-[#621668] border-1 border-[#621668]"><i className="fa-solid fa-plus mr-2"></i>Send Excuse Letter</button>
            </div>
            <div className="lg:ml-70 flex flex-wrap  gap-5  mt-6 px-8" >
                <ExcuseStatusCard status="Approved" view={letter.toggle} edit={editExcuse.toggle}/>
                <ExcuseStatusCard status="Approved" view={letter.toggle} edit={editExcuse.toggle}/>
                <ExcuseStatusCard status="Approved" view={letter.toggle} edit={editExcuse.toggle}/>
                <ExcuseStatusCard status="Pending" view={letter.toggle} edit={editExcuse.toggle}/>
                <ExcuseStatusCard status="Rejected" view={letter.toggle} edit={editExcuse.toggle}/>


                
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeViolet}/>
            </div>

        </>
    );
}
export default ExcuseLetter;