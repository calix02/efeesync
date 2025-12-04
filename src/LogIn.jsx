import School from './assets/CBSUA-Image.png';
import Logo from './assets/Final_Logo.png'
import Cbsua from './assets/cbsua.png';
import LogInOption from './other_components/LogInOption.jsx';
import Pattern from './assets/pattern.png';
import { okAlert, errorAlert } from "./utils/alert.js"; 
import React, {useState} from 'react';

function LogIn(){

    const [emailData, setEmail] = useState("");
    const [passwordData, setPassword] = useState("");
    const [showLogInOption, setShowLogInOption] = useState(false);
    const [availableRoles, setAvailableRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


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
                    setIsLoading(false);
                    setIsSuccess(true);
                    setTimeout(() => {
                        window.location.reload();  
                    }, 750);
                }
            } else {
                setIsLoading(false);
                errorAlert(response.message || "Invalid email or password.");
                return;
            }
           
        } catch (err) {
            setIsLoading(false);
            errorAlert("Login failed. Please try again.");
            return;
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await fetch("/api/check-roles", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(loginData)
            });

            const response = await res.json();
            if (response.status === "success") {
                if (response.roles.length > 1 ) {
                    setIsLoading(false);
                    setAvailableRoles(response.roles);
                    setShowLogInOption(true);
                } else {
                    setIsLoading(true);
                    performLoginWithoutRole();
                }
            } else {
                errorAlert(response.message || "Invalid email or password.");
                setIsLoading(false);
                return;
            }
           
        } catch (err) {
            setIsLoading(false);
            errorAlert("Login failed. Please try again.");
            return;
        }
    }
   


    return(
        <>
         {showLogInOption === true &&(
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
             <LogInOption setIsSuccess={setIsSuccess} setIsLoading={setIsLoading} setShowLogInOption={setShowLogInOption} loginData={loginData} availableRoles={availableRoles}/>
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
            <div className="bg-white lg:w-[50%] relative w-[100%] flex h-screen justify-center items-center">
                <img src={Pattern} className='lg:w-60 hidden lg:block  absolute right-0 bottom-0' alt="" />
                <div className="w-[100%] lg:mt-0 mt-[-340px]">
                    <div className="flex flex-col items-center">
                        <img className="lg:w-25 w-35 lg:z-30 z-40" src={Cbsua} alt="" />
                        <h2 className=" mt-6 text-[#174515] font-bold text-2xl font-poppins">Welcome to eFeeSync</h2>
                    </div>
                    <div className=" flex flex-col justify-center mt-4 ">
                        <form className="px-6 lg:px-40 md:px-50" >
                            <label className="font-semibold text-md font-poppins" htmlFor="">Email:</label><br />
                            <input type="email" onChange={changeEmail} value={emailData}  className="bg-white mb-2 border-2 font-semibold font-inter text-md border-[#000] w-[100%] px-2 py-2 rounded-md" /><br />
                            <label className="font-semibold text-md font-poppins" htmlFor="">Password:</label><br />
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    onChange={changePassword}
                                    value={passwordData}
                                    className="bg-white mb-3 border-2 font-semibold font-inter text-md border-[#000] w-[100%] px-2 py-2 rounded-md pr-10"
                                />

                                {/* Eye Icon */}
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2 hidden cursor-pointer select-none"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c1.83 0 3.554-.457 5.057-1.257M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5a10.52 10.52 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228L9 9m6 6l2.772 2.772M15 15l6 6" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.964 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </span>
                            </div>
                            <button 
                                onClick={submit} 
                                disabled={isSuccess}
                                className={`font-poppins rounded-md cursor-pointer py-2 w-[100%] text-white transition-all duration-300
                                    ${isSuccess ? "bg-green-600" : "bg-[#174515]"}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        { isSuccess ? (
                                            "Success"
                                        ) : (
                                            <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                            Logging in...
                                            </>
                                        )}
                                    </span>
                                ) : isSuccess ? (
                                    "Login Successful"
                                ) : "Login"}
                            </button>

                            {/*<center>
                                <p className="mt-3 text-sm text-[#414040c4] font-poppins">Forgot Password?</p>
                            </center>*/}
                        </form>
                    </div>
                </div>  
            </div>
        </div>
        </>
    );
}
export default LogIn;
