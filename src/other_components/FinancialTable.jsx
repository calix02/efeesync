function FinancialTable({title, financialData =[]}) {
   
    return (
        <div className=" w-[100%] h-105 relative bg-white font-[family-name:Arial] border rounded-lg shadow-[2px_2px_grey]">
            <div className="flex justify-between items-center border-b-2 border-[#686767] mx-5 py-3">
                <h1 className="text-lg font-semibold font-[family-name:Helvetica]">{title}</h1>
                <span className="flex gap-2">
                    <button className="border text-xs border-black flex gap-1.5 rounded-md justify-center items-center w-25 py-1">
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                    <button className="border text-xs border-black flex justify-center items-center w-25 py-1 rounded-md">
                        <i className="fa-solid fa-plus"></i> Add Info
                    </button>
                </span>
            </div>
            <form className="mt-3 mx-4" action="">
                <div className="overflow-y-scroll max-h-80">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="text-sm border-b-2 border-[#6c6c6c67]">
                                <th className="py-1">Date</th>
                                <th>Event</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.map((data, i) => (
                                <tr key={i} className="text-xs font-semibold border-b-2 border-[#6c6c6c67] text-[#4f4e4e]">
                                    <td className="py-1">{data.date}</td>
                                    <td>{data.event}</td>
                                    <td>{data.fee}</td>
                                    <td>---</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
            <div className= " absolute bottom-3 mt-2 px-6">
                <h2 className="font-semibold text-sm">Total</h2>
            </div>
        </div>
    );
}
export default FinancialTable;
