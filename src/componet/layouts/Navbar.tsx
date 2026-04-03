import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="bg-white border-b border-gray-400 top-0 z-50 sticky shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">

          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
                <span className="text-2xl font-bold text-gray-600">Adventure Land</span>
            </div>
          </div>

          <div className="md:flex md:gap-8 items-center">
              <Link className="text-gray-500 hover:text-black px-3 py-2 text-sm font-medium" to="/">SoicalMedia</Link>
              <Link className="text-gray-500 hover:text-black px-3 py-2 text-sm font-medium" to="/service">Service</Link>
              <Link className="text-gray-500 hover:text-black px-3 py-2 text-sm font-medium" to="/login">Login/Signup</Link>
          </div>


          </div>
        </div>
      </nav>
    </>
  );
}
