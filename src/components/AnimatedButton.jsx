import React from "react";

const AnimatedButton = ({ text, color, spanBg, url }) => {
  const baseClasses =
    "w-fit group relative inline-flex items-center gap-3 font-semibold rounded-full px-6 py-3 overflow-hidden transition-colors duration-300";

  const content = (
    <>
      {/* Expanding Background */}
      <span
        className="absolute w-8 h-8 left-4 top-1/2 -translate-y-1/2 rounded-full transform scale-0 group-hover:scale-[15] transition-transform duration-700 ease-out z-0"
        style={{ backgroundColor: spanBg }}
      />

      {/* Icon */}
      <span
        className="relative flex items-center justify-center w-6 h-6 rounded-full overflow-hidden z-10"
        style={{ color: color, backgroundColor: spanBg }}
      >
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-2.5 h-2.5 transition-transform duration-300 ease-in-out group-hover:rotate-45"
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
      </span>

      {/* Text */}
      {spanBg === "#ffffff" ? (
        <span className="poppins-font font-semibold text-sm relative z-10 transition-colors duration-300 group-hover:text-red-500 text-white">
          {text}
        </span>
      ) : (
        <span className="poppins-font font-semibold text-sm relative z-10 transition-colors duration-300 group-hover:text-white text-red-500">
          {text}
        </span>
      )}
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        className={baseClasses}
        style={{ backgroundColor: color }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      style={{ backgroundColor: color }}
    >
      {content}
    </button>
  );
};

export default AnimatedButton;
