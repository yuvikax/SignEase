// import React from "react";
// import "./Button.css";

// const Button = ({ text, btnClass, onClick, href }) => {
//   // Add a default class for buttons
//   const buttonClass = `btn ${btnClass || ''}`.trim();

//   return href ? (
//     <a href={href} className={buttonClass}>
//       {text}
//     </a>
//   ) : (
//     <button className={buttonClass} onClick={onClick}>
//       {text}
//     </button>
//   );
// };

// export default Button;

import React from "react";
import "./Button.css";

const Button = ({ text, btnClass, onClick, href, small }) => {
  // Add a default class for buttons
  const buttonClass = `btn ${btnClass || ''} ${small ? 'small' : ''}`.trim();

  return href ? (
    <a href={href} className={buttonClass}>
      {text}
    </a>
  ) : (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
