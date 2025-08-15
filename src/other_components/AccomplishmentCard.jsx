function AccomplishmentCard({AccomplishPic}){
    return(
        <div className="bg-white w-[580px] h-65 lg:flex lg:gap-0 gap-2 border-1 border-[#000] rounded-[10px] shadow-[2px_2px_grey]">
            <div className=" flex justify-center lg:w-[50%] lg:h-[100%] lg:pt-0 pt-[5px] items-center">
                <img src={AccomplishPic} className='lg:w-55 w-[120px] lg:h-55' alt="" />
            </div>
            <div className="lg:w-[50%] lg:h-[90%] h-[150px] lg:pt-[20px] ">
                <div className='font-semibold text-[16px]'>General Assembly</div>
                <div className='text-[14px] text-[#515151] overflow-y-scroll h-[80%]'>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</div>
                <div className="mt-4 text-[#515151] text-sm">Date: December 18, 2024</div>
            </div>

        </div>
    );
}
export default AccomplishmentCard;