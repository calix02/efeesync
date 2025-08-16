import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import AccomplishPic from '../assets/general.jpg';
import AccomplishmentCard from '../other_components/AccomplishmentCard.jsx';
import AddAccomplishmentCard from '../other_components/AddAccomplishmentCard.jsx';
import it from '../assets/it.png';
import EfeeViolet from '../assets/violetlogo.png'
import React, {useState,useRef} from 'react';
function CITAccomplishment(){
    const [showAddAccomplishment, setShowAddAccomplishment] = useState(false);

    const [animation,setAnimation] = useState('');
    const cardRef = useRef(null);

    const clickedAddBtn = () =>{
        if(!showAddAccomplishment){
            setShowAddAccomplishment(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
    const handlecloseAnimation = () =>{
        if(animation === 'fade-out'){
            setShowAddAccomplishment(false);
        }
    }
    const handleCloseCard = () => {
    setAnimation('fade-out');
    };

    return(
        <>
        {showAddAccomplishment &&
            <>
             <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddAccomplishmentCard ref={cardRef} onAnimationEnd={handlecloseAnimation} animate={animation} onClose={handleCloseCard} />
            </>
        }
            <CITHeader logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className="mt-[110px] relative lg:flex lg:justify-between lg:px-[30px] lg:ml-[290px]">
                    <h2 className="text-[26px] font-semibold ml-[20px]">Accomplishment Report</h2>
                    <button onClick={clickedAddBtn} className='absolute right-[30px] bg-white border-1 border-[#000] p-[5px] text-[14px] font-semibold shadow-[2px_2px_grey] rounded-[5px]'><i className="fa-solid fa-plus"></i>Add Accomplishment</button>
                </div>
                <div className="lg:ml-[280px] flex flex-wrap items-center justify-center gap-4 px-[25px] lg:mt-[10px] mt-[40px]">
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                    <AccomplishmentCard AccomplishPic={AccomplishPic}/>  
                </div>
            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
       

    );
}
export default CITAccomplishment;