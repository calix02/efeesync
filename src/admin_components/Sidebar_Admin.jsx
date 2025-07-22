import { Link } from 'react-router-dom';
import efeelogo from '../assets/efee.png';
import { Outlet } from 'react-router-dom';
function Sidebar_Admin(){

    return(
        <div className="w-[210px] h-screen shadow-[2px_2px_5px_black] z-[-1] flex flex-col-1 fixed overflow-y-auto bg-white top-0">
            <div className="mt-[130px]">
                <span className="flex items-center">
                    <img className="w-[120px] absolute left-0" src={efeelogo} alt="logo"/>
                    <h2 className="text-[22px] ml-[80px] font-[#1C541C] font-semibold ">eFeeSync</h2>
                </span>
                
                <nav className="mt-[40px] px-[10px]">
                    <Link to="/admin/dashboard" className="grid grid-cols-[30px_auto] px-[25px] py-[5px] my-[10px] items-center transition-colors-transform duration-200 text-[18px] hover:bg-[#174515] hover:text-white hover:rounded-[30px]">
                       <span class="material-symbols-outlined">dashboard</span>
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/program" className="grid grid-cols-[30px_auto] px-[25px] py-[5px] my-[10px] items-center transition-colors-transform duration-200 text-[18px] hover:bg-[#174515] hover:text-white hover:rounded-[30px]">
                        <i className="fa-solid fa-table-list"></i>
                         <span>Programs</span>
                         
                    </Link>
                     <Link className="grid grid-cols-[30px_auto] px-[25px] py-[5px] my-[10px] items-center transition-colors-transform duration-200 text-[18px] hover:bg-[#174515] hover:text-white hover:rounded-[30px]" href="#">
                         <i className="fa-solid fa-building"></i>
                         <span>Deparments</span>
                    </Link>
                    <Link className="grid grid-cols-[30px_auto] px-[25px] py-[5px] my-[10px] items-center transition-colors-transform duration-200 text-[18px] hover:bg-[#174515] hover:text-white hover:rounded-[30px]" href="#">
                         <i className="fa-solid fa-sitemap"></i>
                         <span>Organization</span>
                    </Link>
                     <Link className="grid grid-cols-[30px_auto] px-[25px] py-[5px] my-[10px] items-center transition-colors-transform duration-200 text-[18px] hover:bg-[#174515] hover:text-white hover:rounded-[30px]" href="#">
                         <i className="fa-solid fa-user"></i>
                         <span>Accounts</span>
                    </Link>
                    <Link to="/" className= "grid grid-cols-[30px_auto] px-[25px] py-[5px] my-[10px] items-center transition-colors-transform duration-200 text-[18px] hover:bg-[#174515] hover:text-white hover:rounded-[30px]" href="#">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Log Out</span>
                    </Link>      
                </nav>
            </div> 
        </div>
    );
}
export default Sidebar_Admin;