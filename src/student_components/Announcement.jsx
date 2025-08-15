function Announcement(props){
    return(
        <div className="bg-[#EBEBEB] h-18 rounded-sm flex items-center mt-2">
            <p className="text-sm font-[family-name:arial] p-2">{props.announcement}</p>
        </div>
    );
}
export default Announcement;