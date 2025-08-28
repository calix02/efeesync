
function FinancialCard({title, amount, bgColor = "bg-white"}){
    
    return(
        <div className={`${bgColor} w-[100%] h-25 px-2.5 rounded-md shadow-[2px_2px_grey]`}>
            <h2 className="font-semibold lg:text-md md:text-md text-sm mt-4.5 ">{title}</h2>
            <span className="font-bold text-lg">{amount}</span>
        </div>
    );

}
export default FinancialCard;