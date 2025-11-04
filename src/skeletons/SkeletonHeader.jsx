 function SkeletonHeader(){
  return(
      <header className={`flex bg-white fixed top-0 w-screen h-20 lg:z-20 md:z-40 z-60  items-center justify-between border-gray-200 `}>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 ml-5 rounded-full" />
          <div>
            <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-24 bg-gray-200  rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3 px-10">
          <div className="h-8 w-20 bg-gray-200  rounded-full" />
        </div>
      </header>
    );
 }
 export default SkeletonHeader;