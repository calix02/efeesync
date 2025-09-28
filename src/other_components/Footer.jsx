import EfeeLogo from "../assets/Final_Logo.png";
import Osas from "../assets/osas.png";


function Footer (){
    return(
        <div className="w-[100%] border-t-3 border-[#7a7a7a] h-20 p-2 mt-5">
            <div className="flex items-center">
                <img src={EfeeLogo} className="w-5" alt="" />
                <p className="font-poppins text-xs font-semibold">Efee Sync</p>
            </div>
            <div className="py-5">
                <div className="text-center font-[family-name:Arial] text-[#7b7b7b]">© 2025 Office of Student Affairs and Services</div>
            </div>
        </div>
    );
}
export default Footer;