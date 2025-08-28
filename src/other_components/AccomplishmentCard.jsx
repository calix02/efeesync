import "../animate.css";
function AccomplishmentCard({AccomplishPic}){
    const animate = "card-In";
    return(
        <div className={`bg-white w-[100%] lg:h-65 ${animate} md:h-110 flex lg:flex-row flex-col lg:p-2 md:px-15 md:py-4 px-8 py-3  border-1 border-[#000] rounded-lg shadow-[2px_2px_grey]`}>
            <div className=" flex justify-center lg:w-[50%] lg:h-[100%]  items-center">
                <img src={AccomplishPic} className='lg:w-55 md:w-55 w-40 ' alt="" />
            </div>
            <div className="lg:w-[50%] py-8 relative lg:pt-[20px] ">
                <div className='font-semibold text-sm'>General Assembly</div>
                <div className='text-xs text-[#515151] overflow-y-scroll lg:h-[80%]'>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</div>
                <div className="mt-1 lg:absolute lg:bottom-1  text-[#515151] text-xs">Date: December 18, 2024</div>
            </div>

        </div>
    );
}
export default AccomplishmentCard;