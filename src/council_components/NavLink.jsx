import{Link} from 'react-router-dom';

function NavLink(props){
   const hoverColor =
   props.code === "cit" ? 'hover:bg-[#4F1C51]' 
   :props.code === "coe" ? 'hover:bg-[#0E2148]'
   :props.code === "coc" ? 'hover:bg-[#3A0519]'
   :props.code === "cot" ? 'hover:bg-[#FFD95F] text-[#000]'
   :props.code === "eap" ? 'hover:bg-[#4B352A]'
   :props.code === "osas" ? 'hover:bg-[#27391C]'
   : 'hover:bg-blue'

    return(
        
        <Link to={props.navLink} className={`flex items-center ${hoverColor} p-[10px] text-[18px] rounded-[10px] hover:text-white hover:shadow-[3px_2px_2px_grey`}>
            <span className="material-symbols-outlined px-[10px]">{props.iconName}</span>
            <span>{props.navName}</span>
            <span hidden >{props.code}</span>
        </Link>
       
    );
}
export default NavLink;