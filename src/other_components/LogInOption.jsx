import Cbsua from "../assets/cbsua.png";
function LogInOption(){
    return(
        <div className="w-110 h-70 font-poppins px-10 rounded-lg  z-80 bg-white shadow-[2px_2px_3px_grey]">
            <div className="flex justify-center mt-6">
                <img src={Cbsua} className="w-15" alt="" />
            </div>
            <h3 className=" text-lg font-semibold text-center mt-3">Log In As</h3>
            <button className="w-[100%] hover:bg-[#075207] text-sm cursor-pointer hover:text-white transiton duration-200 hover:scale-102 mt-6 rounded-md border-1 bnorder-[#075207] h-8 ">Student</button>
            <button className="w-[100%] hover:bg-[#075207] text-sm cursor-pointer hover:text-white transiton duration-200 hover:scale-102 mt-3 rounded-md border-1 bnorder-[#075207] h-8 ">SC Treasurer</button>


        </div>
    );

}
export default LogInOption;