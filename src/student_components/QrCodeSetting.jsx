
import "../animate.css";
function QrCodeSetting({code,show}){
    const animate = "card-In";

    const hovers = {
        CIT: "hover:bg-[#621668]",
        COE: "hover:bg-[#020180]",
        COC: "hover:bg-[#660A0A]",
        COT: "hover:bg-[#847714]",
        SCEAP: "hover:bg-[#6F3306]",
        SSC: "hover:bg-[#174515]"
    };
    const hover = hovers[code] || "hover:bg-grey";
    return(
        <div className={`w-[100%] ${animate} px-8 shadow-[3px_3px_2px_grey] font-[family-name:Arial] text-sm  py-8 border-1 border-black rounded-xl bg-white`}>
            <h3 className="font-semibold font-[family-name:Helvetica] mb-2">Qr Code</h3>
            <div className="flex lg:flex-row md:flex-row flex-col gap-2 items-center border-1 border-black rounded-xl px-8 py-4 justify-between ">
                <span>
                    <i className="fa-solid fa-expand text-7xl"></i>
                </span>
                <span>
                    <button onClick={show}  className={`px-6 py-1 cursor-pointer ${hover} transition duration-100 hover:text-white bg-white border-1 border-black rounded-md`}>View Qr Code</button>
                </span>
            </div>

        </div>
    );
}
export default QrCodeSetting;