function Announcement(props){
    return(
        <div className="bg-[#EBEBEB] py-4 rounded-lg flex items-center mt-2">
            <p className="text-sm font-[family-name:arial] p-2">{props.announcement}</p>
        </div>
    );
}
export default Announcement;