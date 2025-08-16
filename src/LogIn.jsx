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
            navigate("/org/dashboard")
        }else if(role === "student"){
            navigate("/student/dashboard");
        }
    }
    return(
        <div className="flex lg:flex-row flex-col w-screen h-screen">
            <div className=" relative lg:w-[50%] w-[100%] lg:flex lg:items-center lg:h-screen h-60 bg-gradient-to-t from-[#174515c1] to-white">
                <img className="absolute bottom-0 left-0 lg:h-120 w-[100%] z-[-1]" src={School} alt="" />
                    <div className=" relative lg:mt-0 mt-4 lg:ml-0 ml-[15px] flex lg:items-center items-start  h-[200px] w-[100%]">
                        <img className="lg:absolute lg:left-30 lg:w-60 w-10" src={Logo} alt="" />         
                        <span className="lg:absolute lg:right-30">
                            <h1 className="lg:text-6xl text-[#075207] font-bold  lg:mt-0 mt-3" >eFeeSync</h1>
                            <p className="text-white mt-2 lg:block hidden" >"Fees in Sync. Trust in Sight"</p>
                        </span>
                    </div>
                </div>

            <div className="bg-white lg:w-[50%] w-[100%] flex h-screen justify-center items-center">
                <div className="w-[100%] lg:mt-0 mt-[-230px]">
                    <div className="flex flex-col items-center">
                        <img className="lg:w-25 w-35 z-40" src={Cbsua} alt="" />
                        <h2 className=" mt-6 text-[#174515] font-bold text-2xl">Welcome to eFeeSync</h2>
                    </div>
                    <div className=" flex flex-col justify-center mt-4 ">
                        <form className="px-6 lg:px-40 md:px-50" action="">
                            <label className="font-semibold text-md" htmlFor="">Email:</label><br />
                            <input type="email" className="bg-white mb-2 border-2 font-semibold text-md border-[#000] w-[100%] px-2 py-2 rounded-md" /><br />
                            <label className="font-semibold text-md" htmlFor="">Password:</label><br />
                            <input type="password" className="bg-white mb-2 border-2 font-semibold text-md border-[#000] w-[100%] py-2 rounded-md" /><br /><br />
                            <button onClick={ handleLogIn} className="bg-[#174515] rounded-md cursor-pointer py-2 w-[100%] text-white">Sign In</button>
                            <center>
                                <p className="mt-3 text-sm text-[#414040c4]">Forgot Password?</p>
                            </center>
                        </form>
                    </div>
                </div>  
            </div>
        </div>
    );
}
export default LogIn;