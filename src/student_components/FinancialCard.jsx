
function FinancialCard({title, amount, bgColor = "bg-white"}){
    
    return(
        <div className={`${bgColor} lg:w-[100%] w-[340px] h-[100px] px-8 rounded-[10px] shadow-[2px_2px_grey]`}>
            <h2 className="font-semibold text-[14px] mt-4.5 ">{title}</h2> 
            <span className="font-bold text-2xl">{amount}</span>
        </div>
    );

}
export default FinancialCard;