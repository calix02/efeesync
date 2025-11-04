function SkeletonTable(){
     // Simple table skeleton row
    const SkeletonRow = () => (
        <tr className="animate-pulse">
            <td className="p-3"><div className="h-4 bg-gray-200 rounded " /></td>
            <td className="p-3"><div className="h-4 bg-gray-200 rounded " /></td>
            <td className="p-3"><div className="h-4 bg-gray-200 rounded " /></td>
            <td className="p-3"><div className="h-4 bg-gray-200 rounded " /></td>
        </tr>
    );

    return(
        <div className="lg:ml-70 mt-4 px-3 ">
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left text-sm font-medium text-gray-500"></th>
                            <th className="p-3 text-left text-sm font-medium text-gray-500"></th>
                            <th className="p-3 text-left text-sm font-medium text-gray-500"></th>
                            <th className="p-3 text-left text-sm font-medium text-gray-500"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[...Array(12)].map((_, i) => <SkeletonRow key={i} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default SkeletonTable;