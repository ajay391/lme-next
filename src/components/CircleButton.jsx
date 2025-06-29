import React from "react";

const CircleButton = ({ color = "red" }) => {
  return (
    <button
      className="group w-[50px] h-[50px] bg-white rounded-full overflow-hidden relative grid place-content-center transition-all duration-300 hover:scale-105"
    >
      <svg
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 transition-transform duration-300 group-hover:rotate-45"
        style={{ color }}
      >
        <path
          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default CircleButton;
