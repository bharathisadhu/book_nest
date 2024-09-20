import { FaBookReader, FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const Analytics = () => {
  return (
    <div className="my-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white shadow rounded-lg p-10 flex items-center justify-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaBookReader className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">15,254</h4>
            <p className="text-gray-500">Total Books</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-10 flex items-center justify-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaUsers className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">1,287</h4>
            <p className="text-gray-500">Authors</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-10 flex items-center justify-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <FaCartShopping className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">7,589</h4>
            <p className="text-gray-500">Books Sold</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-10 flex items-center justify-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <HiOutlineEmojiHappy className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">97%</h4>
            <p className="text-gray-500">Happy Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
