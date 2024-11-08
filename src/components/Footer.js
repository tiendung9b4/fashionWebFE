import React from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'
import { fakeDataFooter } from '../constants/fakeData'

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col justify-center items-center bg-[#131d32]">
        <Container>
          <div className="flex flex-col w-full">
            <div
              className="md:flex md:flex-row w-full justify-between items-center border-b-2
           border-white pb-6 pt-10"
            >
              <div>
                <img
                  className="w-[300px] mb-6 md:mb-0"
                  width={300}
                  height={80}
                  src="/images/logo2.png"
                  alt="logo FPT university"
                />
              </div>
              <h1 className="text-[55px] capitalize italic font-semibold text-transparent bg-gradient-to-r from-blue-600 via-orange-600 to-green-600 bg-clip-text animate-pulse drop-shadow-md">
                More than a fashion store
              </h1>
            </div>
            <div className="md:flex justify-between items-center pt-6 pb-10">
              <div className="flex flex-col justify-start items-start gap-3 text-white">


                <div className="flex flex-col justify-start items-start gap-3">
                  <div className="flex justify-start items-center gap-2">
                    <img
                      src="/images/icons/location.svg"
                      className="w-[13px] h-[14px]"
                      width={13}
                      height={14}
                      alt="location"
                    />
                    <h6 className="">{fakeDataFooter.location}</h6>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <img
                      src="/images/icons/phone.svg"
                      className="w-[14px] h-[14px]"
                      width={14}
                      height={14}
                      alt="phone number"
                    />
                    <h6 className="">{fakeDataFooter.phone}</h6>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <img
                      src="/images/icons/mail.svg"
                      className="w-[14px] h-[14px]"
                      width={14}
                      height={14}
                      alt="mail"
                    />
                    <h6 className="">{fakeDataFooter.email}</h6>
                  </div>
                </div>
              </div>
              <div className="md:flex flex-col justify-start items-end md:gap-10 gap-8 mt-20 md:mt-0">
                <div className="md:flex justify-start items-center md:gap-10">
                  <div className="md:flex grid grid-cols-2 md:justify-start md:items-center gap-y-8 gap-x-10 md:gap-6">
                    <Link to={"/"}>
                      <div
                        className="justify-start items-center gap-2 flex"
                      >
                        <div className="border-b border-white justify-center items-center gap-2 flex">
                          <div className="text-white option">Privacy</div>
                        </div>
                        <img
                          src="/images/icons/option.svg"
                          className="w-[11px] h-[11px]"
                          width={11}
                          height={11}
                          alt="option"
                        />
                      </div>
                    </Link>
                    <Link to={"/"}>
                      <div
                        className="justify-start items-center gap-2 flex"
                      >
                        <div className="border-b border-white justify-center items-center gap-2 flex">
                          <div className="text-white option">Privacy</div>
                        </div>
                        <img
                          src="/images/icons/option.svg"
                          className="w-[11px] h-[11px]"
                          width={11}
                          height={11}
                          alt="option"
                        />
                      </div>
                    </Link>
                    <Link to={"/"}>
                      <div
                        className="justify-start items-center gap-2 flex"
                      >
                        <div className="border-b border-white justify-center items-center gap-2 flex">
                          <div className="text-white option">Privacy</div>
                        </div>
                        <img
                          src="/images/icons/option.svg"
                          className="w-[11px] h-[11px]"
                          width={11}
                          height={11}
                          alt="option"
                        />
                      </div>
                    </Link>
                    <Link to={"/"}>
                      <div
                        className="justify-start items-center gap-2 flex"
                      >
                        <div className="border-b border-white justify-center items-center gap-2 flex">
                          <div className="text-white option">Privacy</div>
                        </div>
                        <img
                          src="/images/icons/option.svg"
                          className="w-[11px] h-[11px]"
                          width={11}
                          height={11}
                          alt="option"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="flex md:justify-start justify-start items-center gap-3 mt-8 mb-10 md:m-0">
                    <Link to="https://www.facebook.com/" target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="29"
                        viewBox="0 0 28 29"
                        fill="none"
                      >
                        <path
                          d="M14 0.88208C6.26719 0.88208 0 7.14927 0 14.8821C0 22.6149 6.26719 28.8821 14 28.8821C21.7328 28.8821 28 22.6149 28 14.8821C28 7.14927 21.7328 0.88208 14 0.88208ZM17.0898 12.5086L16.9312 14.6032H14.782V21.8766H12.0695V14.6032H10.6203V12.5086H12.0695V11.1032C12.0695 10.4852 12.0859 9.52817 12.5344 8.93208C13.0102 8.30317 13.6609 7.87661 14.782 7.87661C16.6086 7.87661 17.3742 8.13911 17.3742 8.13911L17.0133 10.2829C17.0133 10.2829 16.4117 10.1079 15.8484 10.1079C15.2852 10.1079 14.782 10.3102 14.782 10.8735V12.5086H17.0898Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                    <Link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="29"
                        viewBox="0 0 28 29"
                        fill="none"
                      >
                        <path
                          d="M12.1353 17.5783L16.7181 14.8876L12.1353 12.197V17.5783Z"
                          fill="white"
                        />
                        <path
                          d="M14 0.88208C6.26719 0.88208 0 7.14927 0 14.8821C0 22.6149 6.26719 28.8821 14 28.8821C21.7328 28.8821 28 22.6149 28 14.8821C28 7.14927 21.7328 0.88208 14 0.88208ZM21 17.3868C21 19.7985 18.5883 19.7985 18.5883 19.7985H9.41172C7 19.7985 7 17.3868 7 17.3868V12.3829C7 9.97114 9.41172 9.97114 9.41172 9.97114H18.5883C21 9.97114 21 12.3829 21 12.3829V17.3868Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                    <Link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="29"
                        viewBox="0 0 28 29"
                        fill="none"
                      >
                        <path
                          d="M14 0.88208C6.26719 0.88208 0 7.14927 0 14.8821C0 22.6149 6.26719 28.8821 14 28.8821C21.7328 28.8821 28 22.6149 28 14.8821C28 7.14927 21.7328 0.88208 14 0.88208ZM10.0844 20.7391H7.35547V12.0055H10.0844V20.7391ZM8.64609 10.9118H8.62422C7.63437 10.9118 6.99453 10.2446 6.99453 9.39692C6.99453 8.53286 7.65625 7.88208 8.6625 7.88208C9.66875 7.88208 10.2867 8.53286 10.3086 9.39692C10.3141 10.2391 9.67422 10.9118 8.64609 10.9118ZM21 20.7391H17.9047V16.2219C17.9047 15.0407 17.4234 14.2313 16.357 14.2313C15.5422 14.2313 15.0883 14.7782 14.8805 15.3032C14.8039 15.4891 14.8148 15.7516 14.8148 16.0196V20.7391H11.7469C11.7469 20.7391 11.7852 12.7329 11.7469 12.0055H14.8148V13.3782C14.9953 12.7766 15.9742 11.9235 17.5383 11.9235C19.4797 11.9235 21 13.1813 21 15.8829V20.7391Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <h6 className="font-jkt text-white">
                  © Copyright {fakeDataFooter.dateTime} SE1730Net. All
                  Rights Reserved
                </h6>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
