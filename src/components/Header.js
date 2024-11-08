import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiGetMe } from "../services/authService";
import { ErrorCommonAxios } from "../axios/ErrorCommonAxios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slice/AuthSlice";
import Cookies from "universal-cookie";
import Container from "./Container";

const cookies = new Cookies()

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    cookies.remove('access_token')
    dispatch(removeUser())
    navigate('/home')
  }

  return (
    <header>
      <div className="bg-gray-900 text-white fixed w-full pt-4 z-50">
        <Container className="flex justify-between items-center">
          <div className="flex flex-col justify-start h-full items-start">
            <a href="/" className="text-xl font-extrabold">
              Fashion Stores
            </a>
          </div>
          {user?.roles?.includes('admin') && <>
            <Link
              to="/manageCoupon"
              className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              ManageCoupon
            </Link>
            <Link
              to="/manageCategory"
              className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              ManageCategory
            </Link>
            <Link
              to="/manageSubCategory"
              className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              ManageSubCategory
            </Link>
            <Link
              to="/manageProduct"
              className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              ManageProduct
            </Link>

          </>}

          <nav>
            <ul className="flex items-center space-x-6">
              <Link
                to="/home"
                className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>
              <Link
                className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                to="/products"
              >
                Our products
              </Link>
              <Link
                className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                to="/products"
              >
                About
              </Link>
              <Link
                className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                to="/products"
              >
                Contact us
              </Link>
              <Link
                to="/products"
                className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Products
              </Link>
            </ul>
          </nav>

          <div>
            {
              user['email'] == null ? <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Register
                </Link>
              </div>
                : <>
                  <Link
                    to="/cart"
                    className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Cart
                  </Link>
                  <Link
                    to="/order"
                    className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Order
                  </Link>
                  <Link
                    to="/chat"
                    className="relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Chat
                  </Link>
                  <div>Hello {user['name']}</div>
                  <Link
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Link>
                  <div style={{ width: '50px' }}>
                    <Link to={`/profile`}>
                      {user['avatarUrl'] ? (
                        <img style={{ borderRadius: '50%' }} className="bg-blue-500 w-10 h-10 flex justify-center items-center" alt='' src={user['avatarUrl']} />
                      ) : (
                        <div style={{ borderRadius: '50%' }} className="bg-blue-500 w-10 h-10 flex justify-center items-center">{user['name'][0]?.toUpperCase()}</div>
                      )}
                    </Link>
                  </div>
                </>
            }
          </div>
        </Container>
      </div>
    </header>
  );
}
