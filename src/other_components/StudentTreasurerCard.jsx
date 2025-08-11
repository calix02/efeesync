
function StudentTreasurerCard(){
    return(
        <div className="bg-white border-1 px-8 border-[#000] shadow-[2px_2px_3px_grey] w-110 rounded-lg h-92">
            <div className="flex justify-between mt-3">
                <h3 className="font-semibold text-lg">Student Council Treasurer</h3>
                <button className="border-1 border-black w-30 text-sm rounded-md "><i className="fa-solid fa-plus"></i>Add Treasurer</button>
            </div>
            <div className="overflow-y-scroll h-75">
                 <table className="w-full text-center mt-3">
                <thead className="border-b-1 border-t-1 border-[#868686]">
                    <tr>
                        <th className="py-1 px-2">Treasurer's Name</th>
                        <th>Council</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-1">citsctreauser@cbsua.edu.ph</td>
                        <td>CITSC</td>
                    </tr>
                    <tr>
                        <td className="py-1">citsctreauser@cbsua.edu.ph</td>
                        <td>CITSC</td>
                    </tr>
                    <tr>
                        <td className="py-1">citsctreauser@cbsua.edu.ph</td>
                        <td>CITSC</td>
                    </tr>
                    <tr>
                        <td className="py-1">citsctreauser@cbsua.edu.ph</td>
                        <td>CITSC</td>
                    </tr>
                    <tr>
                        <td className="py-1">citsctreauser@cbsua.edu.ph</td>
                        <td>CITSC</td>
                    </tr>
                </tbody>
            </table>


            </div>
           
        </div>
    );
}
export default StudentTreasurerCard;