import OsasLogo from '../assets/osas.png';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableStudentOsas from '../osas_components/TableStudentOsas.jsx';
import AddStudentOsasCard from '../osas_components/AddStudentOsasCard.jsx';
import UpdateStudentOsasCard from '../osas_components/UpdateStudentOsasCard.jsx';
import React, {useState,useEffect,useRef} from 'react';
import { errorAlert, successAlert } from '../utils/alert.js';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
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
    const [loading, setLoading] = useState(true);

    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 1
    });

    const [searchValue, setSearchValue] = useState("");
    const [debounceTimer, setDebounceTimer] = useState(null);
    
    function debounce(callback, delay=500) {
        clearTimeout(debounceTimer);
        setDebounceTimer(setTimeout(callback, delay));
    }

    const searchStudent = (search) => {
        setSearchValue(search);
        debounce(() => {
            fetchStudents(1,search);
        }, 500);
    };

    const fetchStudents = async (page=1, search="") => {
        setLoading(true);
        try {
            const res = await fetch(`/api/students?page=${page}&search=${search}`, {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setStudents(response.data);
                setPaginate(response.meta);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        } finally {
            setLoading(false);
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

    const handleFile = async (e) => {
            const selected = e.target.files[0];
            if (selected && !selected.name.endsWith(".csv")) {
                errorAlert("Only CSV file are allowed");
                return;
            }
            if (selected) {
                // Prepare form data
                const formData = new FormData();
                formData.append("csv_file", selected);
                try {
                    const response = await fetch("/api/import/csv", {
                        method: "POST",
                        body: formData,
                    });
                    const result = await response.json();
                    if (response.ok && result.status === "success") {
                        successAlert(`
                            CSV Imported Successfully!\n\n
                            Imported: ${result.imported.length} student(s)\n
                            ${result.skipped.length > 0 ? "Skipped: " : ""} \n${result.skipped
                                .map((e) => `SN: ${e.student_number_id} due to ${e.reason}`)
                                .join("\n")}
                            `);
                        fetchStudents();
                    } else {
                        errorAlert(result.message || "Failed to import CSV");
                    }
                } catch (error) {
                    errorAlert("Error uploading CSV");
                }
            }
            e.target.value = "";
        };

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
       
             <>
            <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                 <div className='lg:ml-68 lg:mt-30 mt-25 lg:flex md:flex md:justify-between lg:justify-between '>
                    <h2 className="text-2xl font-semibold text-[#145712] font-poppins">Manage Students</h2>
                    <div className={` lg:flex md:flex ${animateR}  lg:gap-2.5 md:gap-2.5 text-md font-[family-name:Helvetica] lg:mt-0 md:mt-0 mt-4 lg:px-0 md:px-0 px-3 items-center`}>
                        <input className='lg:w-120 w-[100%] h-12 bg-white rounded-lg px-8 shadow-[2px_2px_1px_gray] font-poppins border border-[#e0e0e0] block' type="text"  onKeyUp={(e) => {searchStudent(e.target.value)}} placeholder='Search Student' />
                        <div className='relative lg:mt-0 md:mt-0 mt-3 lg:mr-4'>
                            <input className='bg-amber-300 lg:w-38 w-[100%] h-10 block z-[1]  cursor-pointer opacity-0' 
                                type="file" 
                                accept=".csv" 
                                onChange={(e) =>{handleFile(e)}}
                            />
                            <button className='bg-[#174515] h-10 lg:w-38 font-poppins w-[100%] flex items-center justify-center cursor-pointer rounded-md  text-white absolute z-[-1] top-0'>
                                <span className="material-symbols-outlined">download</span>Import CSV
                            </button>
                        </div>  
                    </div> 

                </div>
                {loading? (
                    <SkeletonTable/>
                ) : (
                <TableStudentOsas paginate={paginate} search={searchValue} reloadStudents={fetchStudents} students={students} update={(row) =>{
                    setSelectedStudent(row);
                    updateStudent.toggle();
                }} add={addStudent.toggle}/>
             )}

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
            
            </>
    
        </>
    );
}
export default Student;