import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import PaymentStatusCard from "../student_components/PaymentStatusCard.jsx";
import SendPayment from "../student_components/SendPayment.jsx";
import ProofPayment from "../student_components/ProofPayment.jsx";
import EditPayment from "../student_components/EditPayment.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import it from '../assets/it.png';
import React, {useState,useRef} from 'react';
import '../animate.css';



function Payment(){

    const [showSendPayment, setShowSendPayment] = useState(false);
    const [showProofPayment, setShowProofPayment] = useState(false);
    const [showEditPayment, setShowEditPayment] = useState(false);


    const [animation,setAnimation] = useState('');

    const proofRef = useRef(null);
    const paymentRef = useRef(null);
    const editRef = useRef(null);


    const clickedSend = () =>{
        if(!showSendPayment ){
            setShowSendPayment(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }


     const handleClosePayment = () =>{
        if(animation === "fade-out"){
            setShowSendPayment(false);
        }
    }

    const clickedView = () =>{
        if(!showProofPayment ){
            setShowProofPayment(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
    const handleCloseProof = () =>{
        if(animation === "fade-out"){
            setShowProofPayment(false);
        }
    }

     const clickedEdit = () =>{
        if(!showEditPayment ){
            setShowEditPayment(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
    const handleCloseEdit = () =>{
        if(animation === "fade-out"){
            setShowEditPayment(false);
        }
    }

     const handleClose = () =>{
        setAnimation("fade-out");
    }
       
    return(
        <>
        {showSendPayment &&
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <SendPayment ref={paymentRef} onAnimationEnd={handleClosePayment} onClose={handleClose} animate={animation} />  
            </>
               

        }
        {showProofPayment &&
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <ProofPayment ref={proofRef} onAnimationEnd={handleCloseProof} onClose={handleClose} animate={animation} />  
            </>
        }
         {showEditPayment &&
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <EditPayment ref={editRef} onAnimationEnd={handleCloseEdit } onClose={handleClose} animate={animation} />  
            </>
        }
        <Header code="cit" logoCouncil={it} titleCouncil = "College of Information Technology"/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
             <div className="mt-[110px] lg:ml-70 flex justify-between px-6">
                <h2 className="text-2xl font-semibold ">My Payments</h2>
                <button onClick={clickedSend}  className="w-45 h-10 rounded-lg shadow-[2px_2px_3px_grey] text-white bg-[#621668] border-1 border-[#621668]"><i className="fa-solid fa-plus mr-2"></i>Send Payment</button>
            </div> 
            <div className="lg:ml-70 flex flex-wrap gap-6 mt-6 px-6">
                <PaymentStatusCard status="Received" view={clickedView} edit={clickedEdit} />
                <PaymentStatusCard status="Received" view={clickedView} edit={clickedEdit} />
                <PaymentStatusCard status="Pending" view={clickedView} edit={clickedEdit} />
                <PaymentStatusCard status="Pending" view={clickedView} edit={clickedEdit} />
                <PaymentStatusCard status="Received" view={clickedView} edit={clickedEdit} />

                

            </div>
        </div>
             <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeViolet} />
            </div>

        </>
    );
}
export default Payment;