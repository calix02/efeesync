import PropTypes from 'prop-types'
function Card_Admin(props){
    const bgColor =
        props.title === "SSC" ? 'bg-[#C3DBB4] text-[#0B5A01]' 
        : props.title === "COE Council" ? 'bg-[#A2AAC7] text-[#0B015A]'
        : props.title === "COC Council" ? 'bg-[#F39193] text-[#641718]'
        : props.title === "COT Council" ? 'bg-[#FBF9C6] text-[#767B1A]'
        : props.title === "EAP Council" ? 'bg-[#DCC2A7] text-[#2F1E06]'
        : props.title === "CIT Council" ? 'bg-[#C2A2C7] text-[#5A0158]'
        : 'bg-[white]'
    return(
         <div className={`flex-grow lg:flex-grow-0 border-2 rounded-[15px] w-[330px] h-[180px] px-[20px] ${bgColor} shadow-[2px_2px_3px_grey]`}>
            <span className="grid grid-cols-[40px_auto] items-center ml-[10px] mt-[10px] font-bold">
                <img src={props.logo} alt="" className="w-[40px]" />
                <p className="font-bold text-[18px] ml-[5px]">{props.title}</p>
            </span>
            <span className="grid grid-cols-[20px_auto_auto] items-center mt-[10px]  font-bold ">
                <i className="fa-solid fa-coins w-[50px]"></i>
                <p className="text-[16px]">Total Budgets</p>
                <span className="font-bold text-[22px] px-[10px] py-[5px] bg-white rounded-[10px] grid items-center justify-center">P{props.budget}</span>
            </span>
            <span className='flex justify-between px-[15px] mt-[10px] items-center text-black'>
                <p className='text-[14px]'>Fees Collected</p>
                <p className='mr-[15px] font-bold'>P{props.fees}</p>
            </span>
                <span className='flex justify-between px-[15px] items-center text-black'>
                <p className='text-[14px]'>Sanctions Collected</p>
                <p className='mr-[15px] font-bold'>P{props.sanction}</p>
            </span>
        </div>
    );
}
Card_Admin.propTypes= {
    title:PropTypes.string,
    budget: PropTypes.number,
    fees: PropTypes.number,
    sanction: PropTypes.number,

}
export default Card_Admin;