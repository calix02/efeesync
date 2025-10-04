
function FinancialTable({title, total=0, financialData =[], animate, color}) {
   
    return (
        <div className={`lg:w-[100%] ${animate} h-140 overflow-y-scroll hide-scrollbar relative bg-white border rounded-[10px] shadow-[2px_2px_grey]`}>
            <div className="flex justify-between items-center border-b-2 border-[#686767] mx-[15px] py-[10px]">
                <h1 className="text-[20px] font-semibold">{title}</h1>
            </div>
            <form className="mt-[10px] mx-[15px]" action="">
                <div className="overflow-y-scroll hide-scrollbar max-h-[320px]">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="text-sm border-b-2 border-[#6c6c6c67]">
                                <th className="py-1">Date</th>
                                <th>{title === "Cash Outflow"? "Description" :"Event"}</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.map((data, i) => (
                                <tr key={i} className="text-xs font-semibold border-b-2 border-[#6c6c6c67] text-[#4f4e4e]">
                                    <td className="py-1">{title === "Cash Outflow"? data.budget_deducted_at : data.event_end_date}</td>
                                    <td>{title === "Cash Outflow"? data.budget_deduction_title : data.event_name}</td>
                                    <td className="py-3">₱ {title === "Cash Outflow"? data.budget_deduction_amount : data.total_cash_in}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
            <div className= " absolute bottom-3 mt-2 px-[15px]">
                <h2 className="font-semibold text-[14px]">Total: ₱ {total}</h2>
            </div>
        </div>
    );
}

export default FinancialTable;
