import CITHeader from '../council_components/Header_Council.jsx'
import CITSidebar from './CITSidebar.jsx';
import TableEventContribution from '../council_components/TableEventContribution.jsx';
import AddEventContributionCard from '../council_components/AddEventContributionCard.jsx';
import UpdateEventCard from '../council_components/UpdateEventCard.jsx';
import React, {useState,useRef} from 'react';
import it from '../assets/it.png';
import EfeeViolet from '../assets/violetlogo.png'

function CITEventContribution(){
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
                <AddEventContributionCard ref={cardRef} onAnimationEnd={handleAddCardAnimation} animate={animation} onClose={handleCloseCard} />
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
                    <h2 className="text-[26px] font-semibold">Event Contribution</h2>
                    <input className='lg:w-[360px] w-[100%] p-2 bg-white rounded-[10px] border-2 font-semibold border-[#8A2791] block mr-[30px]' type="text" placeholder='Search Events' />
                </div>
                <div className=' w-[100%] lg:mt-[10px] '>
                    <div className='lg:ml-[300px] flex lg:justify-start justify-center gap-2.5'>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">S/Y</option>
                            <option value="">hey</option>
                        </select>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Semester</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Month</option>
                            <option value="">hey</option>

                        </select>
                    </div>
                <TableEventContribution addEvent={clickedAddBtn} updateEvent={clickedUpdateBtn}/>

                </div>
            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
       

    );
}
export default CITEventContribution;