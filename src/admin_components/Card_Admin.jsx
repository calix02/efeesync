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
         <div className={` relative border-2 rounded-lg w-90 h-45 overflow-x-hidden ${bgColor} shadow-[2px_2px_3px_grey]`}>
                <img className='absolute w-62 opacity-50 right-[-110px]' src={props.logo} alt="" />
                <span className="flex items-center">
                    <img src={props.logo} alt="" className="w-20" />
                    <p className="font-bold text-lg ">{props.title}</p>
                </span>
                <div className='flex justify-between px-8 items-center'>
                    <span className='font-bold text-md text-[#000]'>Total Budget</span>
                    <div className='w-40 bg-white py-2 text-center rounded-md z-10 text-xl font-bold'>P{props.budget}</div>
                </div>
                <div className='flex text-[#000] justify-between px-8 items-center mt-3'>
                    <span className='text-sm '>Cash on Hand:</span>
                    <div className='w-40 text-center font-bold text-sm'>P{props.cashHand}</div>
                </div>
                 <div className='flex text-[#000] justify-between px-8 items-center mt-1'>
                    <span className='text-sm '>Cash in Bank:</span>
                    <div className='w-40 text-center font-bold text-sm'>P{props.cashBank}</div>
                </div>
        </div>
    );
}
export default Card_Admin;