import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableEventList from '../other_components/TableEventList.jsx';
import AddEventListCard from '../other_components/AddEventListCard.jsx';
import UpdateEventCard from '../other_components/UpdateEventCard.jsx';
import React, {useState,useRef} from 'react';
import it from '../assets/it.png';
import EfeeViolet from '../assets/violetlogo.png'

function CITEventList(){
    const [showAddEventCard, setShowAddEventCard] = useState(false);
    const [showUpdateEventCard, setShowUpdateEventCard] = useState(false);
    
    const [animation,setAnimation] = useState('');
    const cardRef = useRef(null);

    const clickedAddBtn = () =>{
        if(!showAddEventCard){
            setShowAddEventCard(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
    const clickedUpdateBtn = () =>{
        if(!showUpdateEventCard){
            setShowUpdateEventCard(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
     const handleAddCardAnimation = () =>{
        if(animation === 'fade-out'){
            setShowAddEventCard(false);
        }
    }
    const handleUpdateCardAnimation = () =>{
        if(animation === 'fade-out'){
            setShowUpdateEventCard(false);
        }
    }
    const handleCloseCard = () => {
    setAnimation('fade-out');
    };
    
    return(
        <>
         {showAddEventCard &&
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddEventListCard ref={cardRef} onAnimationEnd={handleAddCardAnimation} animate={animation} onClose={handleCloseCard} />
            </>
        }
        {showUpdateEventCard &&
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateEventCard ref={cardRef} onAnimationEnd={handleUpdateCardAnimation} animate={animation} onClose={handleCloseCard} />
            </>
        }
            <CITHeader logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className="mt-[110px] lg:ml-[280px] px-[20px] flex lg:flex-row flex-col justify-between">
                    <h2 className="text-[26px] font-semibold">Event List</h2>
                    <input className='lg:w-[360px] w-[100%] p-2 bg-white rounded-[10px] border-2 font-semibold border-[#8A2791] block mr-[30px]' type="text" placeholder='Search Events' />
                </div>
                <div className=' w-[100%] lg:mt-2 '>
                    <div className='lg:ml-[300px] flex lg:justify-start justify-center gap-2.5'>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Sort by</option>
                            <option value="">hey</option>
                        </select>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Year</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Section</option>
                            <option value="">hey</option>

                        </select>
                        <button className='bg-white w-[100px] border-1 border-[#8A2791] h-[30px] font-semibold text-[#8A2791] cursor-pointer rounded-[5px] text-[14px] text-center flex justify-center items-center'><span class="material-symbols-outlined">print</span>Print</button>
                    </div>
                <TableEventList addEvent={clickedAddBtn} updateEvent={clickedUpdateBtn}/>

                </div>
            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
       

    );
}
export default CITEventList;