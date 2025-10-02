import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import ExcuseStatusCard from "../student_components/ExcuseStatusCard.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import React, {useRef,useState, useEffect} from 'react';
import SendExcuse from "../student_components/SendExcuse.jsx";
import EditExcuse from "../student_components/EditExcuse.jsx";
import Letter from '../student_components/Letter.jsx';
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import it from '../assets/it.png';
import '../animate.css';


function ExcuseLetter(){
/* ------------------------- Animated States ----------------------------- */
    const letter = useAnimatedToggle();
    const editExcuse = useAnimatedToggle();

    const letterRef = useRef(null);
    const editRef = useRef(null);

    const animate = "card-In";

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
    const [selectedExcuse, setSelectedExcuse] = useState(null);
    
    return(
        <>
        
        {letter.isVisible &&(
            <>
            <div className="fixed inset-0 flex justify-center items-center  lg:z-40 md:z-50 z-70 bg-[#00000062] pointer-events-auto">
                {/* Overlay */}
                <Letter data={selectedExcuse} code={currentUserData?.department_code} ref={letterRef} onAnimationEnd={letter.handleEnd} onClose={() => letter.setAnimation("fade-out")} animate={letter.animation} />
            </div>
        </>

        )
        

        }
         {editExcuse.isVisible &&(
            <>
            <div className="fixed flex justify-center items-center inset-0 lg:z-40 md:z-50 z-70  bg-[#00000062]  pointer-events-auto">
                {/* Overlay */}
                <EditExcuse code={currentUserData?.department_code} ref={editRef} onAnimationEnd={editExcuse.handleEnd} onClose={() => editExcuse.setAnimation("fade-out")} animate={editExcuse.animation} />
            </div>
            </>

         )
        }
        <Header code={currentUserData?.department_code} title = {currentUserData?.department_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="mt-[110px] lg:ml-70 flex justify-between ">
                <h2 className="text-2xl font-semibold font-poppins  ">Excuse Letter Request</h2>
            </div>
            <div className={`lg:ml-70 ${animate} grid lg:grid-cols-3 md:grid-cols-2  gap-5  mt-6`}>
                <ExcuseStatusCard status="Approved" view={(id)=>{
                    letter.toggle();
                    setSelectedExcuse(id);
                    }} edit={editExcuse.toggle}/>
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar code ={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default ExcuseLetter;