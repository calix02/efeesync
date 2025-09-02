
function CardStudent(props){
    const Color = 
    props.title === "Number of Paid Contributions" ? 'bg-[#F1E7FF] text-[#621668] border-[#621668]'
    :props.title === "Number of Unpaid Contributions" ? 'bg-[#E4F5FF] text-[#020180] border-[#020180]'
    :props.title === "Number of Unsettled Contributions" ? 'bg-[#FFEFE7] text-[#6F3306] border-[#6F3306]'
    :props.title === "Number of Active Sanctions" ? 'bg-[#EBFDEF] text-[#174515] border-[#174515]' 
    : "bg-[white]";
    return(
        <div className={`border-2 rounded-md w-[100%] h-28 ${Color} relative px-4 shadow-[2px_2px_3px_grey]`}>
            <div className="text-[#625555] mt-2.5 text-sm font-[family-name:Helvetica]">{props.title}</div>
            <span className="text-4xl font-bold">{props.value}</span>
            <span className="absolute right-3 bottom-4 text-6xl">
                {props.icon}
            </span>
        </div>
    );
}
export default CardStudent;