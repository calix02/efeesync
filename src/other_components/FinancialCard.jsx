
function FinancialCard({title, amount, bgColor = "bg-white"}){
    
    return(
        <div className={`${bgColor} lg:w-[180px] w-[340px] h-[100px] rounded-[10px] shadow-[2px_2px_grey]`}>
            <h2 className="font-semibold text-[14px] mt-4.5 ml-2.5">{title}</h2>
            <center>
                <span className="font-bold text-[20px]">{amount}</span>
            </center>
        </div>
    );

}
export default FinancialCard;