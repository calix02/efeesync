import "../animate.css"
function CardCouncil(props){
    const animate = 'card-In';
    return(
        <div className={` lg:w-[100%] ${animate}  transition duration-300 hover:shadow-[3px_3px_5px_#000] hover:scale-102  max-w-full border-1 border-[#d8d8d8]  h-30 rounded-2xl bg-white relative py-4 px-3 shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]`}>
             <span className=" font-[family-name:Helvetica] lg:text-md text-sm">{props.desc}</span><br />
             <span className="lg:text-2xl text-xl text-[#621668] font-bold font-[family-name:Verdana]">{props.value}</span>
            <span className="absolute right-3 bottom-5 lg:text-7xl text-6xl text-[#b521cc41]">
                {props.icon}
            </span>
           
        </div>
    );
}
export default CardCouncil;