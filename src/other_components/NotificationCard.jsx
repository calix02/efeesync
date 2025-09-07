import React, { useState } from 'react';

const NotificationCard = React.forwardRef(({ animate, onAnimationEnd, code  }, ref) => {
  const [showAll, setShowAll] = useState(true);
  const [showUnread, setShowUnread] = useState(false);

  const clickedAll = () =>{
    setShowAll(true);
    setShowUnread(false);
  }
  const clickedUnread = () =>{
    setShowUnread(true);
    setShowAll(false);
  }
 
  const [notifications, setNotifications] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      notifData: `Your excuse for IT Week has been approved by the council.`,
      date: `July 19, 2025 3:00pm`,
      read: false, // unread by default
    }))
  );

  // ✅ Handle click
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const colors = {
    cit: "text-[#621668]",
    coe: "text-[#221668]",
    coc: "text-[#681616]",
    cot: "text-[#988f11]",
    esaf: "text-[#5a3c1c]",
    ssc: "text-[#174515]",
    osas: "text-[#174515]"
  };
  const color = colors[code] || "text-[#000]";

  return (
    <div
      ref={ref}
      onAnimationEnd={onAnimationEnd}
      className={`${animate} ${color} w-85 h-85 rounded-lg bg-white border-1 border-black shadow-[2px_2px_grey] z-80 absolute lg:right-10 right-5 top-18`}
    >
      <div className="mt-3 px-5 flex justify-between">
        <h2 className={`${color} text-xl font-bold font-[family-name:Helvetica]`}>Notifications</h2>
        <button
          className="text-sm cursor-pointer text-[#666666]"
          onClick={() => setNotifications([])}
        >
          Clear All
        </button>
      </div>

      <div className="px-5 text-black flex gap-5 mt-3">
        <button onClick={clickedAll} className={`${showAll? color : "border-none" } border-b-3 text-sm cursor-pointer font-[family-name:arial] font-semibold`}>All</button>
        <button onClick={clickedUnread} className={` ${showUnread? color : "border-none" } border-b-3 text-sm cursor-pointer font-[family-name:arial] font-semibold`}>Unread</button>
      </div>

      <div className="overflow-y-scroll hide-scrollbar h-55 px-5  pt-2">
        {(showAll? [...notifications].sort((a, b) => b.read - a.read)  : notifications.filter(n => !n.read)).map((data) =>(
          <div
      key={data.id}
      onClick={() => markAsRead(data.id)}
      className={`cursor-pointer rounded-md mt-2 text-sm flex items-center gap-5 p-2 transition ${
        data.read
          ? "bg-gray-200 text-black"
          : "hover:bg-[#e1dede] bg-white text-[#625555]"
      }`}
    >
      {/* Bullet */}
      <span>
        <i
          className={`fa-solid fa-circle text-[8px] ${
            data.read ? color : "text-grey-500"
          }`}
        ></i>
      </span>

      {/* Content */}
      <span>
        {data.notifData} <br />
        <span className="text-[10px]">{data.date}</span>
      </span>
    </div>

        ))}
       
      </div>

      <div className="mt-2 px-6">
        <button className="bg-[#b8b2b2c0] w-full py-1 rounded-md text-sm">
          View All Notifications
        </button>
      </div>
    </div>
  );
});

export default NotificationCard;
