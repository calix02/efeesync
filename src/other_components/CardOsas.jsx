import "../animate.css"
function CardOsas(props){
    const animate = 'fade-in';
    const borderColor = 
    props.title === "Number of Colleges" ? 'border-[#ACD8A7] text-[#17451580]'
    : props.title === "Number of Councils" ? 'border-[#FCBBD8] text-[#660A0A80]'
    : props.title === "Number of Programs" ? 'border-[#D4E4FF] text-[#14036880]'
    : props.title === "Number of Students" ? 'border-[#ECCEFC] text-[#5C0C7380]'
    : 'border-[#000]'

    const countColor = 
    props.title === "Number of Colleges" ? 'text-[#174515]'
    : props.title === "Number of Councils" ? 'text-[#660A0A]'
    : props.title === "Number of Programs" ? 'text-[#140368]'
    : props.title === "Number of Students" ? 'text-[#5C0C73]'
    : 'text-black';


    return(
        <div className={` lg:w-[90%] ${animate} max-w-full border-l-12 ${borderColor}  h-28  bg-white relative py-4 px-3 shadow-md shadow-gray-200`}>
            <div className="font-inter lg:text-md md:text-md text-sm text-black">{props.title}</div>
            <div className={`font-bold text-4xl lg:text-5xl font-poppins ${countColor}`}>{props.count}</div>

            <span className="absolute right-2 bottom-3 lg:text-6xl md:text-6xl text-5xl">{props.pic}</span> 
           
        </div>
    );
}
export default CardOsas;