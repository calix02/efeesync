import {Link} from 'react-router-dom';
import OsasLogo from '../assets/osas.png';
function Header_Admin(){

    return(
    
        <header className="grid grid-cols-[100px_auto_130px] lg:grid-cols-[100px_auto_160px] fixed top-0 w-screen h-[80px] z-[1] bg-white items-center shadow-[2px_2px_3px_grey]">
            <span className='grid justify-end'>
                <img src={OsasLogo} alt="logo" width="70px" />
            </span>
            <span>
                <h2 className="lg:hidden text-[22px] font-semibold">OSAS</h2>
                <h2 className="hidden lg:block text-[24px] font-semibold ml-[10px]">Office of Student Affairs</h2>
            </span>
            
            <span className="text-[20px]">
                <i className="fa-solid fa-cloud-moon px-[10px] cursor-pointer"></i>
                <i className="fa-solid fa-bars lg:hidden px-[10px] cursor-pointer"></i>
            </span>
            <span>
                <nav className="w-screen flex flex-col px-[30px] bg-white pt-[40px] lg:hidden">
                    <Link className="py-[5px] px-[5px]">
                        <i className="fa-solid fa-gauge px-[8px]"></i>
                        <span>Dashboard</span>
                    </Link>
                    <Link className="py-[5px] px-[5px]">
                        <i className="fa-solid fa-table-list px-[8px]"></i>
                        <span>Programs</span>
                    </Link>
                    <Link className="py-[5px] px-[5px]">
                        <i className="fa-solid fa-building px-[8px]"></i>
                        <span>Deparments</span>
                    </Link>
                    <Link className="py-[5px] px-[5px]">
                        <i className="fa-solid fa-sitemap px-[8px]"></i>
                         <span>Organization</span>
                    </Link>
                    <Link className="py-[5px] px-[5px]">
                        <i className="fa-solid fa-user px-[8px]"></i>
                        <span>Accounts</span>
                    </Link>
                     <Link className="py-[5px] px-[5px]">
                        <i className="fa-solid fa-right-from-bracket px-[8px]"></i>
                        <span>Log out</span>
                    </Link>
                </nav>
            </span>
          
        </header>
      
    );
}
export default Header_Admin