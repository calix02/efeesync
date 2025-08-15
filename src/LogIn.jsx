import { useNavigate } from "react-router-dom";
import School from './assets/CBSUA-Image.png';
import Logo from './assets/Final_Logo.png'
import Cbsua from './assets/cbsua.png';

function LogIn(){

    const navigate = useNavigate();
    let role = "student"
    const handleLogIn = () =>{
        if(role === "osas"){
             navigate("/osas/dashboard");
        }else if(role === "cit"){
            navigate("/org/citdashboard")
        }else if(role === "student"){
            navigate("/student/dashboard");
        }
    }
    return(
        <div className="flex lg:flex-row flex-col w-screen h-screen">
            <div className=" relative lg:w-[50%] w-screen lg:flex lg:items-center lg:h-screen h-[200px] bg-gradient-to-t from-[#174515c1] to-white">
                <img className="absolute bottom-0 left-0 lg:h-[570px] w-[100%] z-[-1]" src={School} alt="" />
                    <div className=" relative lg:mt-0 mt-[15px] lg:ml-0 ml-[15px] flex lg:items-center items-start h-[200px] w-[100%]">
                        <img className="lg:absolute lg:right-[385px] lg:w-[235px] w-[40px]" src={Logo} alt="" />         
                        <span className="lg:absolute lg:right-[120px]">
                            <h1 className="lg:text-[65px] text-[#075207] font-bold font-Poppins lg:mt-0 mt-[15px]" >eFeeSync</h1>
                            <p className="text-white lg:block hidden" >"Fees in Sync. Trust in Sight"</p>
                        </span>
                    </div>
                </div>

            <div className="bg-white lg:w-[50%] w-[100%] flex h-screen justify-center items-center">
                <div className="w-[100%] lg:mt-0 mt-[-230px]">
                    <div className="flex flex-col items-center">
                        <img className="lg:w-[80px] w-[140px] z-40" src={Cbsua} alt="" />
                        <h2 className=" mt-[20px] text-[#174515] font-bold text-[24px]">Welcome to eFeeSync</h2>
                    </div>
                    <div className=" flex justify-center mt-[20px]">
                        <form action="">
                            <label className="" htmlFor="">Email:</label><br />
                            <input type="email" className="bg-white border-2 border-[#000] w-[400px] py-[5px] rounded-[5px]" /><br />
                            <label htmlFor="">Password:</label><br />
                            <input type="password" className="bg-white border-2 border-[#000] w-[400px] py-[5px] rounded-[5px]" /><br /><br />
                            <button onClick={ handleLogIn} className="bg-[#174515] rounded-[5px] cursor-pointer p-[5px] w-[400px] text-white">Sign In</button>
                            <center>
                                <p className="mt-[10px] text-[#414040c4]">Forgot Password?</p>
                            </center>
                        </form>

                    </div>
                    
                    

                </div>
                
            </div>
        </div>
    );
}
export default LogIn;