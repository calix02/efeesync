import { Link } from "react-router-dom";
import "../animate.css"

function CardCouncil({code,icon, value, desc,show, link}){
    const animate = 'card-In';
    const textColors = {
    CIT: " text-[#621668]",
    COE: " text-[#020180]",
    COC: " text-[#660A0A]",
    COT: " text-[#847714]",
    ESAF: " text-[#6F3306]",
    SSC: " text-[#174515]"
  };
  const textColor = textColors[code] || "border-[#174515] text-[#174515]";
  const iconColors = {
    CIT: " text-[#63166857]",
    COE: " text-[#0101804e] ",
    COC: " text-[#660a0a52]",
    COT: " text-[#8477145d]",
    ESAF: " text-[#6f33065a]",
    SSC: " text-[#17451573]"
  };
  const iconColor = iconColors[code] || "text-[#17451573]";

    return(
      
        <Link to={link} onClick={show} className={` lg:w-[100%] ${animate} ${show? "cursor-pointer" : " "}  transition duration-300 hover:shadow-[3px_3px_5px_#000] hover:scale-102  max-w-full border-1 border-[#d8d8d8]  h-30 rounded-2xl bg-white relative py-4 px-3 shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]`}>
             <span className=" font-[family-name:Helvetica] text-black lg:text-md text-sm">{desc}</span><br />
             <span className={`lg:text-2xl text-xl ${textColor} font-bold font-[family-name:Verdana]`}>{value}</span>
            <span className={`absolute right-3 bottom-5 lg:text-7xl md:text-7xl text-5xl text- ${iconColor} `}>
                {icon}
            </span>
           
        </Link>
    );
}
export default CardCouncil;