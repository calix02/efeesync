import OsasLogo from '../assets/osas.png';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableStudentOsas from '../osas_components/TableStudentOsas.jsx';
import AddStudentOsasCard from '../osas_components/AddStudentOsasCard.jsx';
import UpdateStudentOsasCard from '../osas_components/UpdateStudentOsasCard.jsx';
import React, {useState,useEffect,useRef} from 'react';
import { errorAlert, successAlert } from '../utils/alert.js';
import '../animate.css';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';




function Student(){
    document.title = "Student";
    const animateL = "left-In";
    const animateR = "right-In";
/* ------------------------- Animated States ----------------------------- */
    const addStudent = useAnimatedToggle();
    const updateStudent = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [colleges, setColleges] = useState([]);
    const [students, setStudents] = useState([]);
    
   

    const fetchStudents = async () => {
        try {
            const res = await fetch("/api/students", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setStudents(response.data);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        }
    }

    const fetchColleges = async () => {
        try {
            const res = await fetch("/api/departments", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setColleges(response.data);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        }
    }

    useEffect(()=> {
        fetchColleges();
        fetchStudents();
    }, []);
   
    return(
        <>
        {addStudent.isVisible &&(
            <>
                 <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddStudentOsasCard reloadStudents={fetchStudents} colleges={colleges} ref={addRef} onAnimationEnd={addStudent.handleEnd} onClose={() => addStudent.setAnimation("fade-out")} animate={addStudent.animation} />
            </>

        )
            
        }
        {updateStudent.isVisible &&(
            <>  
                 <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateStudentOsasCard reloadStudents={fetchStudents} colleges={colleges} data={selectedStudent} ref={updateRef} onAnimationEnd={updateStudent.handleEnd} onClose={() => updateStudent.setAnimation("fade-out")} animate={updateStudent.animation} />

            </>

        )
        }
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                 <div className='lg:ml-68 lg:mt-30 mt-25 lg:flex md:flex md:justify-between lg:justify-between '>
                    <h2 className="text-2xl font-semibold text-[#145712] font-poppins">Manage Students</h2>
                    <div className={` lg:flex md:flex ${animateR}  lg:gap-2.5 md:gap-2.5 text-md font-[family-name:Helvetica] lg:mt-0 md:mt-0 mt-4 lg:px-0 md:px-0 px-3 items-center`}>
                        <input className='lg:w-85 w-[100%] p-1.5 bg-white rounded-md border-2  border-[#174515] block' type="text" placeholder='Search Student' />
                        <div className='relative lg:mt-0 md:mt-0 mt-3 lg:mr-4'>
                            <input className='bg-amber-300 lg:w-[150px] w-[100%] h-[35px] block z-[1]  cursor-pointer opacity-0' 
                                type="file" 
                                accept=".csv" 
                                onChange={(e) =>{
                                    const file = e.target.files[0];
                                    if(file && !file.name.endsWith(".csv")){
                                        errorAlert("Only CSV files are allowed!");
                                        e.target.value = "";
                                    }else if(file){
                                        successAlert("CSV file selected: ", file.name);
                                    }
                                }}
                            />
                            <button className='bg-[#174515] p-1.5 lg:w-38 font-poppins w-[100%] flex items-center justify-center cursor-pointer rounded-md  text-white absolute z-[-1] top-0'>
                                <span className="material-symbols-outlined">download</span>Import CSV
                            </button>
                        </div>  
                    </div> 

                </div>
                  <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start font-[family-name:Arial]  justify-center gap-2.5`}>
                         <select className='bg-white lg:w-25  w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#174515] hover:text-white cursor-pointer border-1 border-[#174515] py-1  text-[#174515] rounded-md text-center'  name="" id="">
                            <option value="">Sort by</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white lg:w-25 w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#174515] hover:text-white cursor-pointer border-1 border-[#174515] py-1  text-[#174515] rounded-md text-center'  name="" id="">
                            <option value="">Year</option>
                            <option value="">hey</option>

                        </select>
                        <button className='bg-white lg:w-25 w-20 flex items-center justify-center text-xs transition duration-100 hover:scale-100 hover:bg-[#174515] hover:text-white cursor-pointer border-1 border-[#174515]  text-[#174515] rounded-md text-center'><span className="material-symbols-outlined">print</span>Print</button>

                          
                    </div>
                </div>
             <TableStudentOsas reloadStudents={fetchStudents} students={students} update={(row) =>{
                setSelectedStudent(row);
                updateStudent.toggle();
             }} add={addStudent.toggle}/>

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default Student;