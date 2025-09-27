import React, {useState} from 'react';
import {Link} from  'react-router-dom';

function DropDownNav(props){
    const colors = {
        CIT: "hover:bg-[#621668] ",
        COE: "hover:bg-[#020180] ",
        COC: "hover:bg-[#660A0A] ",
        COT: "hover:bg-[#847714] ",
        ESAF: "hover:bg-[#6F3306] ",
        SSC: "hover:bg-[#174515] "
      };
      const color = colors[props.code] || "hover:bg-[#174515]";
   
    const [isShowNav,setIsShowNav] = useState(false);
    const clickedUpdate = () =>{
        setIsShowNav(!isShowNav);
    }
    return(
        <>
            <Link onClick={clickedUpdate} className={`flex items-center font-[family-name:Helvetica] p-2.5 text-md ${color} transition duration-150 rounded-md hover:text-white`}>
                <span className="material-symbols-outlined px-2.5">{props.iconName}</span>
                <span>{props.navName}</span>
                <span className="material-symbols-outlined">
                {isShowNav ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                </span> 
            </Link>

            {isShowNav && (
                <div className='ml-8 font-[family-name:Helvetica] border-l-4 border-[#c2c2c2] px-1.5'>
                    <Link to={props.subNavLink1} className={`flex items-center p-[8px] text-sm ${color} hover:text-white rounded-sm`}>
                        <span className="material-symbols-outlined px-2.5">{props.iconName1}</span>
                        <span>{props.subNavName1}</span>
                        <span hidden>{props.code}</span>
                    </Link>
                    <Link to={props.subNavLink2} className={`flex items-center p-[8px] text-sm ${color} hover:text-white rounded-sm`}>
                        <span className="material-symbols-outlined px-2.5">{props.iconName2}</span>
                        <span>{props.subNavName2}</span>
                        <span hidden>{props.code}</span>
                    </Link>
                </div>
            )}
        </>
    );
}
export default DropDownNav;