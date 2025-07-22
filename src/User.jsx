import Sidebar_Admin from "./admin_components/Sidebar_Admin.jsx";
import Header_Admin from "./admin_components/Header_Admin.jsx";
import Card_Admin from "./admin_components/Card_Admin.jsx";
import it from "./assets/it.png"

function User(){
    return(
        <>
            <Header_Admin/>
             <div className="w-screen h-screen bg-amber-50 z-[-1] absolute">
                <div className="mt-[100px]">
                <h2 className='text-bold ml-[230px] text-[30px]'>User Dashboard</h2>
                </div>
            <div className="flex flex-wrap gap-[10px] mx-[40px] mt-[20px] lg:ml-[280px] lg:gap-[50px] ">
                <Card_Admin logo={it} title="CIT Council" budget={19987} fees={1262} sanction={6638}/> 
                <Card_Admin logo={it} title="CIT Council" budget={19987} fees={1262} sanction={6638}/>    
                <Card_Admin logo={it} title="CIT Council" budget={19987} fees={1262} sanction={6638}/>    

            </div>
                <div className="flex justify-center mx-[30px] mt-[20px]">
                    <div className=" lg:ml-[230px] w-[600px] grid items-center justify-center bg-white border-2 rounded-[20px] shadow-[2px_2px_2px_grey]">
                        <Graph/>
                    </div>
                </div>
                    
                    
                
            </div>
            <div className="hidden lg:block">
                <Sidebar_Admin/>
            </div>
        </>
    );
}
export default User;