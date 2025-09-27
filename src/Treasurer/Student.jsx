import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import AddStudentCard from '../treasurer_components/AddStudentCard.jsx';
import TableStudent from '../treasurer_components/TableStudent.jsx';
import UpdateStudentCard from '../other_components/UpdateStudentCard.jsx';
import EfeeViolet from '../assets/violetlogo.png'
import React, {useState,useRef, useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import { errorAlert,successAlert } from '../utils/alert.js';
import { useLocation } from "react-router-dom";

import '../animate.css';

function CITStudent(){
    const animateR = "right-In";
    const animateL = "left-In";

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const year = params.get("year");

    const [currentUserData, setCurrentUserData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [students, setStudents] = useState([]);
    const [debounceTimer, setDebounceTimer] = useState(null);

    function debounce(callback, delay=500) {
        clearTimeout(debounceTimer);
        setDebounceTimer(setTimeout(callback, delay));
    }

    const fetchStudents = async (deptCode=currentUserData.department_code, isUnivOrg=currentUserData.university_wide_org, page=1, search="") => {
        try {
            let url = "";

            if (isUnivOrg) {
                url = `/api/students?page=${page}&search=${search}`;
            } else {
                url = `/api/departments/code/${deptCode}/students?page=${page}&search=${search}`;
            }

            const res = await fetch(url, { credentials: "include" });
            const response = await res.json();
            if (response.status === "success") {
                setStudents(response.data);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        }
    };
    
    const fetchCurrentUser = async () => {
        try {
            const res = await fetch("/api/users/current", { credentials: "include" });
            const response = await res.json();
            if (response.status === "success") {
                const user = response.data;
                setCurrentUserData(user);
                await fetchStudents(user.department_code, user.university_wide_org);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        }
    };

    const searchStudent = (search) => {
        setSearchValue(search);
        debounce(() => {
            fetchStudents(
            currentUserData.department_code,
            currentUserData.university_wide_org,
            1,
            search
            );
        }, 500);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
    }, [currentUserData]);

    const [file, setFile] = useState(null);

    const handleFile = (e) =>{
        const selected = e.target.files[0];
        if (selected && !selected.name.endsWith(".csv")){
            errorAlert("Only CSV file are allowed");
            e.target.value = "";

        } else if(selected){
            successAlert("Succesfully Imported CSV File");
        }

    }

    const [selectedStudent, setSelectedStudent] = useState(null);

/* ------------------------- Animated States ----------------------------- */
    const addStudent = useAnimatedToggle();
    const updateStudent = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);

    return(
        <>
        {addStudent.isVisible &&(
            <>
                {/* Add Student*/}
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <AddStudentCard ref={addRef} currentUser={currentUserData} reloadStudents={fetchStudents} onAnimationEnd={addStudent.handleEnd} animate={addStudent.animation} onClose={() => addStudent.setAnimation("fade-out")} />
                </div>
            </>

        )
            
        }
         {updateStudent.isVisible &&(
            <>
                {/* Update Student */}
                <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <UpdateStudentCard ref={updateRef} reloadStudents={fetchStudents} data={selectedStudent} onAnimationEnd={updateStudent.handleEnd} animate={updateStudent.animation} onClose={() => updateStudent.setAnimation("fade-out")} />
                </div>
            </>

         )
            
        }
            <CITHeader code={currentUserData?.department_code} titleCouncil ={currentUserData?.organization_name} abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className='lg:ml-70 lg:mt-30 mt-25 lg:flex md:flex md:justify-between lg:justify-between '>
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Manage Students</h2>
                    <div className={` lg:flex md:flex ${animateR}  lg:gap-2.5 md:gap-2.5 text-md font-[family-name:Helvetica] lg:mt-0 md:mt-0 mt-4 lg:px-0 md:px-0 px-3 items-center`}>
                        <input className='lg:w-85 w-[100%] p-1.5 bg-white rounded-md border-2  border-[#8A2791] block' type="text" onKeyUp={(e) => {searchStudent(e.target.value)}} placeholder='Search Student' />
                        <div className='relative lg:mt-0 md:mt-0 mt-3'>
                            <input className='bg-amber-300 lg:w-[150px] w-[100%] h-[35px] block z-[1]  cursor-pointer opacity-0' type="file" accept='.csv' onChange={handleFile} />
                            <button className='bg-[#8A2791] p-1.5 lg:w-38 w-[100%] flex items-center justify-center cursor-pointer rounded-md  text-white absolute z-[-1] top-0'>
                                <span className="material-symbols-outlined">download</span>Import CSV
                            </button>
                        </div>  
                    </div> 

                </div>
                <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start font-[family-name:Arial]  justify-center gap-2.5`}>
                        {/*<select className='bg-white lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white  border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Sort by</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white  border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Year</option>
                            <option value="">hey</option>

                        </select>
                          <select className='bg-white lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white  border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Section</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white  border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Status</option>
                            <option value="">hey</option>
                        </select>
                        */}
                        <button title='Print' onClick={()=>{window.print()}} className='bg-white lg:w-25 w-20 transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white text-xs cursor-pointer flex justify-center gap-1 border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'><i className="fa-solid fa-print"></i>Print</button>
                    </div>

                </div>
                <TableStudent code={currentUserData?.department_code}  year= {year}
                reloadStudents={fetchStudents} 
                students={students} 
                show={addStudent.toggle} 
                update={(row) =>{
                setSelectedStudent(row);
                updateStudent.toggle();
                }} />      

                             
               
            </div>
            <div className='hidden lg:block'>
                <CITSidebar code={currentUserData?.department_code} />
            </div>
        </>
    );
}
export default CITStudent;