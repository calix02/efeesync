import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import PaymentStatusCard from "../student_components/PaymentStatusCard.jsx";
import SendPayment from "../student_components/SendPayment.jsx";
import ProofPayment from "../student_components/ProofPayment.jsx";
import EditPayment from "../student_components/EditPayment.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import it from '../assets/it.png';
import React, {useRef, useState, useEffect} from 'react';
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import '../animate.css';
import { errorAlert } from '../utils/alert.js';




function Payment(){
/* ------------------------- Animated States ----------------------------- */
    const animate = "card-In";
    const animateR = "right-In"
    const proofPayment = useAnimatedToggle();
    const editPayment = useAnimatedToggle();

    const proofRef = useRef(null);
    const editRef = useRef(null);

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

    return(
        <>
       
        {proofPayment.isVisible &&(
            <>
                <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center inset-0 bg-[#00000062] pointer-events-auto">
                    {/* Overlay */}
                    <ProofPayment ref={proofRef} onAnimationEnd={proofPayment.handleEnd} onClose={() => proofPayment.setAnimation("fade-out")} animate={proofPayment.animation} />  
                </div>
            </>
        )   
        }
         {editPayment.isVisible &&(
            <>
                <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center inset-0 bg-[#00000062]  pointer-events-auto">
                    {/* Overlay */}
                    <EditPayment ref={editRef} onAnimationEnd={editPayment.handleEnd} onClose={() => editPayment.setAnimation("fade-out")} animate={editPayment.animation} />  

                </div>
            </>
         )   
        }
        <Header code={currentUserData?.department_code} title ={currentUserData?.department_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
             <div className="mt-[110px] lg:ml-70 flex justify-between px-6">
                <h2 className="text-2xl font-semibold ">My Payments</h2>
            </div> 
            <div className={`${animate} lg:ml-70 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-6 px-6`}>
                <PaymentStatusCard status="Received" view={proofPayment.toggle} edit={editPayment.toggle} />
                <PaymentStatusCard status="Received" view={proofPayment.toggle} edit={editPayment.toggle} />
                <PaymentStatusCard status="Pending" view={proofPayment.toggle} edit={editPayment.toggle} />
                <PaymentStatusCard status="Received" view={proofPayment.toggle} edit={editPayment.toggle} />
            </div>
        </div>
             <div className='lg:block hidden' >
                 <Sidebar  code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default Payment;