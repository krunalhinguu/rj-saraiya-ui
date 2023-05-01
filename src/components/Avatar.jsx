import React from "react";

const Avatar = ({ name, surname }) => {
  const firstLetter = name.charAt(0).toUpperCase();
  const secondLetter = surname.charAt(0).toUpperCase();
  const initials = `${firstLetter}${secondLetter}`;

  return (
    <div className="w-9 h-9 rounded-full font-semibold bg-gray-400 flex items-center justify-center text-white">
      {initials}
    </div>
  );
};

export default Avatar;
