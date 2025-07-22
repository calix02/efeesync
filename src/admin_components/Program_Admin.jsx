import Header_Admin from './Header_Admin.jsx';
import Sidebar_Admin from './Sidebar_Admin.jsx';
function Program_Admin(){
    return(
        <>
        <Header_Admin/>
        <div className="w-screen h-screen bg-amber-50 z-[-1] absolute">
            <div className="mt-[120px]">
                <h2 className='text-bold ml-[230px] text-[30px]'>Programs</h2>
            </div>
            <div>
                <div></div>
            </div>
        </div>
        <div className="hidden lg:block">
            <Sidebar_Admin/>
        </div>
        </>
        
    );
}

export default Program_Admin;