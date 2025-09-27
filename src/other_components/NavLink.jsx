import{Link} from 'react-router-dom';

function NavLink(props){
    const colors = {
        CIT: "hover:bg-[#621668] ",
        COE: "hover:bg-[#020180] ",
        COC: "hover:bg-[#660A0A] ",
        COT: "hover:bg-[#847714] ",
        ESAF: "hover:bg-[#6F3306] ",
        SSC: "hover:bg-[#174515] ",
        OSAS: "hover:bg-[#174515]",
      };
      const color = colors[props.code] || "hover:bg-[#174515]";
   
  

    return(    
        <Link to={props.navLink} className={`flex items-center font-[family-name:Helvetica] ${color} transition duration-150 p-2.5 text-md  rounded-md hover:text-white hover:shadow-[3px_2px_2px_grey`}>
            <span className="material-symbols-outlined px-2.5">{props.iconName}</span>
            <span>{props.navName}</span>
        </Link>
       
    );
}
export default NavLink;