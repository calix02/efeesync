import "../animate.css"
function CardCouncil(props){
    const animate = 'fade-in';
    return(
        <div className={` lg:w-[260px] ${animate}  h-[120px] w-[340px] rounded-[25px] bg-white relative py-[20px] px-[15px] lg:flex-grow-0 flex-grow-1 shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]`}>
             <span>{props.desc}</span><br />
             <span className="text-[30px] font-bold">{props.value}</span>
            <span className="absolute right-[18px] bottom-0 text-[76px] text-[#b521cc41]">
                {props.icon}
            </span>
           
        </div>
    );
}
export default CardCouncil;