import PropTypes from 'prop-types'
function Card_Admin(props){
    const bgColor =
        props.title === "SSC" ? 'bg-[#ACD8A7] text-[#0B5A01]' 
        : props.title === "CESC" ? 'bg-[#D4E4FF] text-[#140368]'
        : props.title === "CCSC" ? 'bg-[#FCBBD8] text-[#660A0A]'
        : props.title === "COTSC" ? 'bg-[#F6FFB1] text-[#675C08]'
        : props.title === "SCEAP" ? 'bg-[#FFD8CC] text-[#6F3306]'
        : props.title === "CITSC" ? 'bg-[#ECCEFC] text-[#5C0C73]'
        : 'bg-[white]'
    return(
         <div className={` relative  rounded-sm h-40 shadow-gray-200 overflow-hidden ${bgColor}`}>
                <img className='absolute w-35 opacity-50 right-[-70px] top-2' src={props.logo} alt="" />
                <span className="flex gap-2 items-center">
                    <img src={props.logo} alt="" className="w-12 mt-2 ml-2" />
                    <p className="font-bold font-poppins mt-2 text-lg ">{props.title}</p>
                </span>
                <div className='flex justify-between px-8 items-center'>
                    <span className='font-bold font-inter text-md text-[#000]'>Total Budget</span>
                    <div className='w-40 bg-white py-1 text-center rounded-md z-10 text-xl font-bold font-poppins'>₱ {props.budget}</div>
                </div>
                <div className='flex text-[#000] justify-between px-8 items-center mt-3'>
                    <span className='text-sm font-inter '>Cash on Hand:</span>
                    <div className='w-40 text-left font-inter font-bold text-sm'>₱ {props.cashHand}</div>
                </div>
                 <div className='flex text-[#000] justify-between px-8 items-center mt-1'>
                    <span className='text-sm font-inter '>Cash in Bank:</span>
                    <div className='w-40 text-left font-bold font-inter text-sm'>₱ {props.cashBank}</div>
                </div>
        </div>
    );
}
export default Card_Admin;