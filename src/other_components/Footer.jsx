import EfeeLogo from "../assets/Final_Logo.png";
import Osas from "../assets/osas.png";



function Footer (){
    return(
        <div className="w-[100%]  h-10 p-2 mt-5">
            
            <div className="py-5">
                <div className="justify-center gap-3 flex lg:flex-row flex-col lg:items-center font-poppins text-xs text-[#625555]">
                    <span className="flex items-center  gap-1">
                         <img src={Osas} className="w-5" alt="" />
                        <span> Office of Student Affairs and Services <span>
                    </span>
                   
                    <span>
                        </span>| © 2025.All Right Reserved. | Alvarado, Bobis, Gamboa</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
export default Footer;