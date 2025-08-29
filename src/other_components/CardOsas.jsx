import "../animate.css"
function CardOsas(props){
    const animate = 'fade-in';
    const borderColor = 
    props.title === "Number of Colleges" ? 'border-[#ACD8A7] text-[#17451580]'
    : props.title === "Number of Councils" ? 'border-[#FCBBD8] text-[#660A0A80]'
    : props.title === "Number of Programs" ? 'border-[#D4E4FF] text-[#14036880]'
    : props.title === "Number of Students" ? 'border-[#ECCEFC] text-[#5C0C7380]'
    : 'border-[#000]'

    return(
        <div className={` lg:w-[100%] ${animate} max-w-full border-l-10 ${borderColor}  h-30  bg-white relative py-4 px-3 shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]`}>
            <div className="font-semibold lg:text-md md:text-md text-xs text-[#625555]">{props.title}</div>
            <div className="font-bold text-2xl font-[family-name:Verdana] text-[#000] ml-3">{props.count}</div>
            <span className="absolute right-2 bottom-3 lg:text-6xl md:text-6xl text-5xl">{props.pic}</span> 
           
        </div>
    );
}
export default CardOsas;