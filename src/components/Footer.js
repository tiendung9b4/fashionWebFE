import React from 'react'

export default function Footer() {
  return (
    <footer style={{position: "fixed", width: "100%"}} className="bg-gray-900 text-white py-4 absolute bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; 2024 Your E-commerce Store. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">About Us</a>
          <a href="#" className="hover:text-gray-300">Contact Us</a>
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}
