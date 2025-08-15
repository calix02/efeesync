import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import ExcuseStatusCard from "../student_components/ExcuseStatusCard.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import React, {useState,useRef} from 'react';
import SendExcuse from "../student_components/SendExcuse.jsx";
import EditExcuse from "../student_components/EditExcuse.jsx";
import Letter from '../student_components/Letter.jsx';
import it from '../assets/it.png';
import '../animate.css';


function ExcuseLetter(){
    const [showSend, setShowSend] = useState(false);
    const [showLetter, setShowLetter] = useState(false);
    const [showEdit, setShowEdit] = useState(false);


    const [animation,setAnimation] = useState('');

    const sendRef = useRef(null);
    const letterRef = useRef(null);
    const editRef = useRef(null);
    




    const clickedSend = () =>{
        if(!showSend ){
            setShowSend(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
    const handleCloseSend = () =>{
        if(animation === "fade-out"){
            setShowSend(false);
        }
    }

     const clickedView = () =>{
        if(!showSend ){
            setShowLetter(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
    const handleCloseLetter = () =>{
        if(animation === "fade-out"){
            setShowLetter(false);
        }
    }

    const clickedEdit = () =>{
        if(!showEdit ){
            setShowEdit(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
     const handleCloseEdit = () =>{
        if(animation === "fade-out"){
            setShowEdit(false);
        }
    }

    const handleClose = () =>{
        setAnimation("fade-out");
    }

       
    return(
        <>
        {showSend &&
        <>
            <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                {/* Overlay */}
            </div>
                <SendExcuse ref={sendRef} onAnimationEnd={handleCloseSend} onClose={handleClose} animate={animation} />  
        </>
            
        }

        {showLetter &&
        <>
            <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                {/* Overlay */}
            </div>
            <Letter ref={letterRef} onAnimationEnd={handleCloseLetter} onClose={handleClose} animate={animation} />


        </>

        }
         {showEdit &&
        <>
            <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                {/* Overlay */}
            </div>
            <EditExcuse ref={editRef} onAnimationEnd={handleCloseEdit} onClose={handleClose} animate={animation} />


        </>

        }
        <Header code="cit" logoCouncil={it} titleCouncil = "College of Information Technology"/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70 flex justify-between px-6">
                <h2 className="text-2xl font-semibold ">Excuse Letter Request</h2>
                <button onClick={clickedSend} className="w-45 h-10 rounded-lg shadow-[2px_2px_3px_grey] text-white bg-[#621668] border-1 border-[#621668]"><i className="fa-solid fa-plus mr-2"></i>Send Excuse Letter</button>
            </div>
            <div className="lg:ml-70 flex flex-wrap  gap-5  mt-6 px-8" >
                <ExcuseStatusCard status="Approved" view={clickedView} edit={clickedEdit}/>
                <ExcuseStatusCard status="Approved" view={clickedView} edit={clickedEdit}/>
                <ExcuseStatusCard status="Pending" view={clickedView} edit={clickedEdit}/>
                <ExcuseStatusCard status="Pending" view={clickedView} edit={clickedEdit}/>
                <ExcuseStatusCard status="Rejected" view={clickedView} edit={clickedEdit}/>

                
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeViolet}/>
            </div>

        </>
    );
}
export default ExcuseLetter;