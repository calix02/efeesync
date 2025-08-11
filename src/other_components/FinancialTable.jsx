function FinancialTable({title, financialData =[]}) {
   
    return (
        <div className="lg:w-[46%] w-[340px] h-[440px] relative bg-white border rounded-[10px] shadow-[2px_2px_grey]">
            <div className="flex justify-between items-center border-b-2 border-[#686767] mx-[15px] py-[10px]">
                <h1 className="text-[20px] font-semibold">{title}</h1>
                <span className="flex gap-2">
                    <button className="border text-[12px] border-black flex gap-1.5 rounded-[5px] justify-center items-center w-[100px] py-[2px]">
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                    <button className="border text-[12px] border-black flex justify-center items-center w-[100px] py-[2px] rounded-[5px]">
                        <i className="fa-solid fa-plus"></i> Add Info
                    </button>
                </span>
            </div>
            <form className="mt-[10px] mx-[15px]" action="">
                <div className="overflow-y-scroll max-h-[320px]">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="text-[12px] border-b-2 border-[#6c6c6c67]">
                                <th className="py-[5px]">Date</th>
                                <th>Event</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.map((data, i) => (
                                <tr key={i} className="text-[12px] font-semibold border-b-2 border-[#6c6c6c67] text-[#4f4e4e]">
                                    <td className="py-[5px]">{data.date}</td>
                                    <td>{data.event}</td>
                                    <td>{data.fee}</td>
                                    <td>---</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
            <div className= " absolute bottom-3 mt-2 px-[15px]">
                <h2 className="font-semibold text-[14px]">Total</h2>
            </div>
        </div>
    );
}

export default FinancialTable;
