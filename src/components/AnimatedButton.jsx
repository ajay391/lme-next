import React from "react";

const AnimatedButton = ({ text, color = "#ef4444", textColor = "#ffffff", url }) => {
  const baseClasses =
    "inline-block w-fit px-6 py-3 rounded-sm text-base font-semibold transition duration-300";

  const styles = {
    backgroundColor: color,
    color: textColor,
  };

  if (url) {
    return (
      <a href={url} className={baseClasses} style={styles}>
        {text}
      </a>
    );
  }

  return (
    <button className={baseClasses} style={styles}>
      {text}
    </button>
  );
};

export default AnimatedButton;
