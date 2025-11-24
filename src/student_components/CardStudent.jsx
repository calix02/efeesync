import { Link } from "react-router-dom";
function CardStudent(props){
    const Color = 
    props.title === "Number of Paid Contributions" ? 'bg-[#F1E7FF] text-[#621668] border-[#621668]'
    :props.title === "Number of Unpaid Contributions" ? 'bg-[#E4F5FF] text-[#020180] border-[#020180]'
    :props.title === "Number of Unsettled Contributions" ? 'bg-[#FFEFE7] text-[#6F3306] border-[#6F3306]'
    :props.title === "Number of Active Sanctions" ? 'bg-[#EBFDEF] text-[#174515] border-[#174515]' 
    : "bg-[white]";
    return(
        <Link to={props.link} className={`border-2 cursor-pointer font-poppins hover:scale-105 transition duration-500 rounded-2xl w-[100%] h-30 ${Color} relative px-4 shadow-[2px_2px_3px_grey]`}>
            <div className="text-[#625555] mt-2.5 text-sm font-[family-name:Helvetica]">{props.title}</div>
            <span className="lg:text-5xl text-4xl ml-2 font-bold">{props.value}</span>
            <span className="absolute lg:right-3 right-5 bottom-5 lg:bottom-4 lg:text-7xl text-5xl">
                {props.icon}
            </span>
        </Link>
        
    );
}
export default CardStudent;