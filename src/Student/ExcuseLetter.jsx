import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import ExcuseStatusCard from "../student_components/ExcuseStatusCard.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import React, {useRef,useState, useEffect} from 'react';
import SendExcuse from "../student_components/SendExcuse.jsx";
import EditExcuse from "../student_components/EditExcuse.jsx";
import Letter from '../student_components/Letter.jsx';
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonExcuseBox from "../skeletons/SkeletonExcuseBox.jsx";
import it from '../assets/it.png';
import { errorAlert, confirmAlert } from '../utils/alert.js';

import '../animate.css';


function ExcuseLetter(){
/* ------------------------- Animated States ----------------------------- */
    const letter = useAnimatedToggle();
    const editExcuse = useAnimatedToggle();

    const letterRef = useRef(null);
    const editRef = useRef(null);

    const animate = "card-In";

    const [currentUserData, setCurrentUserData] = useState(() => {
    const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });

    const [userLoading, setUserLoading] = useState(true);
    const [excuseLoading, setExcuseLoading] = useState(true);
    
    const fetchCurrentUser = async () => {
        setUserLoading(true);
        try {
            const res = await fetch("/api/users/current", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
               setCurrentUserData(response.data);
               localStorage.setItem("currentUserData", JSON.stringify(response.data));
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        }finally{
            setUserLoading(false);
        }
    }

    const formatDateStr = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
        }

    const [excuseData, setExcuseData] = useState([]);

    const fetchExcuses = async () => {
        setExcuseLoading(true);
        try {
            const res = await fetch("/api/students/current/excuses", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
               setExcuseData(response.data);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        }finally{
            setExcuseLoading(false);
        }
    }
    
    useEffect(() => {
        fetchCurrentUser();
        fetchExcuses();
    }, []);

    const [selectedExcuse, setSelectedExcuse] = useState(null);
    const clickedDelete = (id) => {
    confirmAlert("It will delete permanently").then( async (result) =>{
        if(result.isConfirmed){
          try {
            const res = await fetch("/api/students/current/excuses/" + id, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const response = await res.json();
            if (response.status === "success") {
                fetchExcuses();
            } else {
                alert("Failed: " + response.message);
            }
        } catch (err) {
            alert("Fetch failed: " + err);
        }
        }
      });
    }
    
    return(
        <>
        
        {letter.isVisible &&(
            <>
            <div className="fixed inset-0 flex justify-center items-center  lg:z-40 md:z-50 z-70 bg-[#00000062] pointer-events-auto">
                {/* Overlay */}
                <Letter formatDateStr={formatDateStr} data={selectedExcuse} code={currentUserData?.organization_code} ref={letterRef} onAnimationEnd={letter.handleEnd} onClose={() => letter.setAnimation("fade-out")} animate={letter.animation} />
            </div>
        </>
        )
        

        }
         {editExcuse.isVisible &&(
            <>
            <div className="fixed flex justify-center items-center inset-0 lg:z-40 md:z-50 z-70  bg-[#00000062]  pointer-events-auto">
                {/* Overlay */}
                <EditExcuse data={selectedExcuse} fetchExcuses={fetchExcuses} code={currentUserData?.organization_code} ref={editRef} onAnimationEnd={editExcuse.handleEnd} onClose={() => editExcuse.setAnimation("fade-out")} animate={editExcuse.animation} />
            </div>
            </>

         )
        }
        {userLoading ? (
            <SkeletonHeader/>
        ) :(
            <Header code={currentUserData?.organization_code} title = {currentUserData?.department_name}/>
         )}
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="mt-[110px] lg:ml-70 flex justify-between ">
                <h2 className="text-2xl font-semibold font-poppins  ">Excuse Letter Request</h2>
            </div>
            <div className={`lg:ml-70 ${animate} grid lg:grid-cols-3 md:grid-cols-2  gap-5  mt-6`}>
                {excuseLoading ? (
                    <>
                    <SkeletonExcuseBox/>
                    <SkeletonExcuseBox/>
                    <SkeletonExcuseBox/>
                    <SkeletonExcuseBox/>
                    <SkeletonExcuseBox/>
                    <SkeletonExcuseBox/>

                    </>

                 ) :(
                excuseData.length > 0 ?
                (excuseData.map((ed)=>(
                    <ExcuseStatusCard formatDateStr={formatDateStr} data={ed} view={()=>{
                    letter.toggle();
                    setSelectedExcuse(ed);
                    }} edit={() =>{
                        editExcuse.toggle();
                        setSelectedExcuse(ed)
                    }} del={()=>{
                        clickedDelete(ed?.attendance_excuse_id)
                    }}
                    />
                ))):
                (
                    <p>No Excuse Letter Request</p>
                )
                
                )}
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar code ={currentUserData?.organization_code} />
            </div>

        </>
    );
}
export default ExcuseLetter;