import CashOutflowCard from "../treasurer_components/CashOutflowCard";
import { confirmAlert, errorAlert } from "../utils/alert";

function FinancialTable({title, financialData =[], code, add, edit, total, fetchFinancialReportData }) {
 const hoverColors = {
            CITSC: " hover:bg-[#621668]",
            CESC: "hover:bg-[#020180]",
            CCSC: "hover:bg-[#660A0A]",
            COTSC: "hover:bg-[#847714]",
            SCEAP: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
        };
    const hoverColor = hoverColors[code] || "hover:bg-[#174515]";
    const colors = {
        CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
        CESC: "border-[#020180] text-[#020180] bg-[#020180]",
        CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
        SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg[#174515]",
    };

  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

  const deleteDeduction = (s) => {
    confirmAlert("It will delete permanently").then( async (result) =>{
          if(result.isConfirmed){
            try {
              const res = await fetch("/api/budget/deduct/" + s.budget_deduction_id, {
                  method: "DELETE",
                  credentials: "include",
                  headers: {
                      "Content-Type": "application/json"
                  }
              });
              const response = await res.json();
              if (response.status === "success") {
                  await fetchFinancialReportData();
              } else {
                  errorAlert("Failed: " + response.message);
              }
          } catch (err) {
              errorAlert("Fetch failed: " + err);
          }
          }
        });
    }
   
    return (
        <div className=" w-[100%] h-135 relative bg-white font-poppins border rounded-lg shadow-[2px_2px_grey]">
            <div className="flex justify-between items-center border-b-2 border-[#686767] mx-5 py-3">
                <h1 className="roboto text-xl font-semibold">{title}</h1>
                {title === "Cash Outflow" &&
                <span className="flex gap-2">
                    <button onClick={add} title="Add Information"  className={` ${hoverColor} hover:text-white transition duration-200 font-semibold hover:scale-105 cursor-pointer border text-xs border-[#e0e0e0] shadow-[2px_2px_1px_gray]  flex gap-1.5 rounded-md justify-center items-center w-25 py-2`}>
                        <i className="fa-solid fa-plus"></i> Add Info
                    </button>
                </span>
                }
            </div>
            <form className="mt-3 mx-4" action="">
                <div className="overflow-y-scroll hide-scrollbar max-h-110 ">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="text-sm border-b-2 border-[#6c6c6c67]">
                                <th className="py-1">Date</th>
                                <th>{title === "Cash Outflow"? "Description" :"Event"}</th>
                                <th>Amount</th>
                                {title === "Cash Outflow" &&(
                                    <th>Action</th> 
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.length > 0 ? 
                            (financialData.map((data, i) => (
                                <tr key={i} className="text-xs font-semibold border-b-2 border-[#6c6c6c67] text-[#4f4e4e]">
                                    <td className="py-6">{title === "Cash Outflow"? data.budget_deducted_at : data.event_end_date}</td>
                                    <td>{title === "Cash Outflow"? data.budget_deduction_title : data.event_name}</td>
                                    <td className="py-3">₱ {title === "Cash Outflow"? data.budget_deduction_amount : data.total_cash_in}</td>
                                    {title === "Cash Outflow" && (
                                        <td className={`text-[#055e1b] py-6`}>
                                           <span onClick={() => edit(data)} className={`material-symbols-outlined ${color} cursor-pointer bg-white shadow-[2px_2px_1px_grey] rounded-sm border px-0.5`}>edit_square</span>
                                           <span onClick={(e)=> deleteDeduction(data)} className={`material-symbols-outlined ml-2 text-[#930505] cursor-pointer bg-white shadow-[2px_2px_1px_grey] rounded-sm border px-0.5`}>delete</span>
                                        </td>
                                    )}
                                </tr>
                            ))) :
                            (
                            <tr>
                                <td colSpan={title === "Cash Outflow"?  4  : 3} className="py-5 text-gray-500 italic text-center">No Financial Data</td>
                            </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </form>
            <div className= " absolute bottom-3  mt-2 px-6">
                <h2 className="roboto font-semibold text-lg">Total: ₱ {total}</h2>
            </div>
        </div>
    );
}
export default FinancialTable;
