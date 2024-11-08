"use client";

import PhenikaaButton from "./components/button";

export default function NotFound() {
  const goHome = () => {
    window.location.href = "/";
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center flex flex-col items-center">
        <img src="/images/404.svg" alt="404 Not Found" className="mb-8" />
        <p className="text-lg text-gray-600 mb-8">
          Ôi không! Trang bạn đang tìm kiếm không tồn tại.
        </p>
        <PhenikaaButton
          onClick={goHome}
          title="Trở về Trang chủ"
        />
      </div>
    </div>
  );
}
