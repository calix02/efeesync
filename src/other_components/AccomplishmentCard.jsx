function AccomplishmentCard({AccomplishPic}){
    return(
        <div className="bg-white w-[580px] h-[280px] lg:flex lg:gap-0 gap-2 border-1 border-[#000] rounded-[10px] shadow-[2px_2px_grey]">
            <div className=" flex justify-center lg:w-[50%] lg:h-[100%] lg:pt-0 pt-[5px] items-center">
                <img src={AccomplishPic} className='lg:w-[250px] w-[120px] lg:h-[250px]' alt="" />
            </div>
            <div className="lg:w-[50%] lg:h-[100%] h-[150px] lg:pt-[20px] overflow-y-scroll ">
                <div className='font-semibold text-[16px]'>General Assembly</div>
                <div className='text-[14px] text-[#515151]'>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</div>

            </div>

        </div>
    );
}
export default AccomplishmentCard;