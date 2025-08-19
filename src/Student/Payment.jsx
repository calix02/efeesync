import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import PaymentStatusCard from "../student_components/PaymentStatusCard.jsx";
import SendPayment from "../student_components/SendPayment.jsx";
import ProofPayment from "../student_components/ProofPayment.jsx";
import EditPayment from "../student_components/EditPayment.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import it from '../assets/it.png';
import React, {useRef} from 'react';
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import '../animate.css';



function Payment(){
/* ------------------------- Animated States ----------------------------- */
    const sendPayment = useAnimatedToggle();
    const proofPayment = useAnimatedToggle();
    const editPayment = useAnimatedToggle();

    const paymentRef = useRef(null);
    const proofRef = useRef(null);
    const editRef = useRef(null);

    return(
        <>
        {sendPayment.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <SendPayment ref={paymentRef} onAnimationEnd={sendPayment.handleEnd} onClose={()=> sendPayment.setAnimation("fade-out")} animate={sendPayment.animation} />  
            </>
        )
        }
        {proofPayment.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <ProofPayment ref={proofRef} onAnimationEnd={proofPayment.handleEnd} onClose={() => proofPayment.setAnimation("fade-out")} animate={proofPayment.animation} />  
            </>
        )   
        }
         {editPayment.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <EditPayment ref={editRef} onAnimationEnd={editPayment.handleEnd} onClose={() => editPayment.setAnimation("fade-out")} animate={editPayment.animation} />  
            </>
         )   
        }
        <Header code="cit" logoCouncil={it} titleCouncil = "College of Information Technology"/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
             <div className="mt-[110px] lg:ml-70 flex justify-between px-6">
                <h2 className="text-2xl font-semibold ">My Payments</h2>
                <button onClick={sendPayment.toggle}  className="w-45 h-10 rounded-lg shadow-[2px_2px_3px_grey] text-white bg-[#621668] border-1 border-[#621668]"><i className="fa-solid fa-plus mr-2"></i>Send Payment</button>
            </div> 
            <div className="lg:ml-70 flex flex-wrap gap-6 mt-6 px-6">
                <PaymentStatusCard status="Received" view={proofPayment.toggle} edit={editPayment.toggle} />
                <PaymentStatusCard status="Received" view={proofPayment.toggle} edit={editPayment.toggle} />
                <PaymentStatusCard status="Pending" view={proofPayment.toggle} edit={editPayment.toggle} />
                <PaymentStatusCard status="Received" view={proofPayment.toggle} edit={editPayment.toggle} />


                

            </div>
        </div>
             <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeViolet} />
            </div>

        </>
    );
}
export default Payment;