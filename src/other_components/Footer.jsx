import EfeeLogo from "../assets/Final_Logo.png";
import Osas from "../assets/osas.png";



function Footer (){
    return(
        <div className="w-[100%]  h-10 p-2 mt-5">
            
            <div className="py-5">
                <div className="justify-center gap-3 flex items-center font-poppins text-xs text-[#625555]">
                    <img src={Osas} className="w-5" alt="" />
                    <span> Office of Student Affairs and Services | © 2025.All Right Reserved. | Alvarado, Bobis, Gamboa</span>
                </div>
            </div>
        </div>
    );
}
export default Footer;