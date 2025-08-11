import "../animate.css"
function CardCouncil(props){
    const animate = 'fade-in';
    return(
        <div className={` lg:w-65 ${animate} max-w-full  h-30 rounded-2xl bg-white relative py-4 px-3 shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]`}>
             <span>{props.desc}</span><br />
             <span className="lg:text-3xl text-2xl font-bold">{props.value}</span>
            <span className="absolute right-[18px] bottom-5 text-7xl text-[#b521cc41]">
                {props.icon}
            </span>
           
        </div>
    );
}
export default CardCouncil;