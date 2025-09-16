import School from './assets/CBSUA-Image.png';
import Logo from './assets/Final_Logo.png'
import Cbsua from './assets/cbsua.png';
import LogInOption from './other_components/LogInOption.jsx';
import { okAlert, errorAlert } from "./utils/alert.js"; 
import React, {useState} from 'react';

function LogIn(){

    const [emailData, setEmail] = useState("");
    const [passwordData, setPassword] = useState("");
    const [showLogInOption, setShowLogInOption] = useState(false);
    const [availableRoles, setAvailableRoles] = useState([]);

    const changeEmail = (e) => setEmail(e.target.value);
    const changePassword = (e) => setPassword(e.target.value);

    const loginData = {
        "email": emailData,
        "password": passwordData
    };

    const performLoginWithoutRole = async () => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(loginData)
            });

            const response = await res.json();
            if (response.status === "success") {
                if (response.data != null) {
                    window.location.reload();  
                }
            } else {
                errorAlert(response.message || "Invalid email or password.");
                return;
            }
           
        } catch (err) {
            errorAlert("Login failed. Please try again.");
            return;
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/check-roles", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(loginData)
            });

            const response = await res.json();
            if (response.status === "success") {
                if (response.roles.length > 1 ) {
                    setAvailableRoles(response.roles);
                    setShowLogInOption(true);
                } else {
                    performLoginWithoutRole();
                }
            } else {
                errorAlert(response.message || "Invalid email or password.");
                return;
            }
           
        } catch (err) {
            errorAlert("Login failed. Please try again.");
            return;
        }
    }
   


    return(
        <>
         {showLogInOption === true &&(
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
             <LogInOption loginData={loginData} availableRoles={availableRoles}/>
            </div>
        
            )}
        <div className="flex lg:flex-row flex-col w-screen h-screen">
            <div className=" relative lg:w-[50%] w-[100%] lg:flex lg:items-center lg:h-screen h-60 bg-gradient-to-t from-[#174515c1] to-white">
                <img className="absolute bottom-0 left-0 lg:h-120 w-[100%] z-[-1]" src={School} alt="" />
                    <div className=" lg:mt-0 mt-4 lg:ml-0 ml-[15px] flex lg:justify-center lg:items-center items-start  h-[200px] w-[100%]">
                        <img className=" lg:w-60 w-10" src={Logo} alt="" />         
                        <span>
                            <h1 className="lg:text-6xl text-[#075207] font-bold font-poppins  lg:mt-0 mt-3" >eFeeSync</h1>
                            <p className="text-white mt-2 lg:block hidden font-inter" >"Fees in Sync. Trust in Sight"</p>
                        </span>
                    </div>
                </div>
            <div className="bg-white lg:w-[50%] w-[100%] flex h-screen justify-center items-center">
                <div className="w-[100%] lg:mt-0 mt-[-230px]">
                    <div className="flex flex-col items-center">
                        <img className="lg:w-25 w-35 z-40" src={Cbsua} alt="" />
                        <h2 className=" mt-6 text-[#174515] font-bold text-2xl font-poppins">Welcome to eFeeSync</h2>
                    </div>
                    <div className=" flex flex-col justify-center mt-4 ">
                        <form className="px-6 lg:px-40 md:px-50" >
                            <label className="font-semibold text-md font-poppins" htmlFor="">Email:</label><br />
                            <input type="email" onChange={changeEmail} value={emailData}  className="bg-white mb-2 border-2 font-semibold font-inter text-md border-[#000] w-[100%] px-2 py-2 rounded-md" /><br />
                            <label className="font-semibold text-md font-poppins" htmlFor="">Password:</label><br />
                            <input type="password" onChange={changePassword} value={passwordData} className="bg-white mb-2 border-2 font-semibold font-inter text-md border-[#000] w-[100%] px-2 py-2 rounded-md" /><br /><br />
                            <button onClick={submit} className="bg-[#174515] font-poppins rounded-md cursor-pointer py-2 w-[100%] text-white">Sign In</button>
                            <center>
                                <p className="mt-3 text-sm text-[#414040c4] font-poppins">Forgot Password?</p>
                            </center>
                        </form>
                    </div>
                </div>  
            </div>
        </div>
        </>
    );
}
export default LogIn;