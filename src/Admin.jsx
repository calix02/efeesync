import Header_Admin from './admin_components/Header_Admin.jsx';
import Sidebar_Admin from './admin_components/Sidebar_Admin.jsx';
import Dashboard_Admin from './admin_components/Dashboard_Admin.jsx';

function Admin(){

    return(
        <>
            <Header_Admin/>
            <Dashboard_Admin/>
            <div className="hidden lg:block">
                <Sidebar_Admin/>
            </div>
       </>
    );
}

export default Admin;