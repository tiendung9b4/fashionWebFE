import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ title, className, url }) => (
  <Link
    to={`${url}`}
    className={`${className} flex items-center justify-center gap-x-3 px-6 py-2 text-white font-bold leading-[21px] bg-[#03428E] rounded-[32px] transition-all duration-500 hover:bg-[#F26522]`}
  >
    <p className="text-base">{title}</p>
    <img
      loading="eager"
      priority
      src="/images/icons/white-arrow.svg"
      alt="icon"
      className="relative"
      height={16}
      width={16}
    />
  </Link >
);

export default Button;
