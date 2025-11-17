
function SkeletonFinancialTable (){
    return(
        <div className="bg-white border mt-5 border-gray-200 rounded-lg p-4 w-full">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="space-y-2">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 p-3 border-b border-gray-100">
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default SkeletonFinancialTable;