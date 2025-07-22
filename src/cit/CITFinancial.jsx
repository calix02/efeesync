import CITHeader from '../council_components/Header_Council.jsx'
import CITSidebar from './CITSidebar.jsx';
import FinancialCard from '../council_components/FinancialCard.jsx';
import FinancialTable from '../council_components/FinancialTable.jsx';
import it from '../assets/it.png';
import EfeeViolet from '../assets/violetlogo.png'
function CITFinancial(){
    return(
        <>
            <CITHeader logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className="mt-[110px] lg:ml-[280px]">
                    <h2 className="text-[26px] font-semibold ml-[20px]">Financial Report</h2>
                </div>
                <div className='lg:ml-[280px] flex gap-4 justify-center mt-[20px]'>
                    <FinancialCard title="Cash Inflow" amount="P200 000.00" bgColor="bg-[#FFD8CC]"/>
                    <FinancialCard title="Cash Outflow" amount="P100 000.00" bgColor="bg-[#FCBBD8]"/>
                    <FinancialCard title="Cash On Hand" amount="P50 000.00" bgColor="bg-[#ECCEFC]"/>
                    <FinancialCard title="Cash In Bank" amount="P15 000.00" bgColor="bg-[#E0D2FF]"/>
                    <FinancialCard title="Starting Balance" amount="P10 000.00" bgColor="bg-[#D4E4FF]"/>
                    <FinancialCard title="Ending Balance" amount="P0.00" bgColor="bg-[#CCEBFF]"/>
                </div>
                <div className='lg:ml-[280px] mt-[20px] gap-4 flex justify-center'>
                    <FinancialTable/>
                    <FinancialTable/>

                </div>

            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
       

    );
}
export default CITFinancial;