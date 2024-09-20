'use client'

export default function Community(){
    return(
        <>
        <div className="  py-4">
      <div className=" bg-Community bg-cover bg-no-repeat py-10 sm:py-14 lg:py-20 px-5 sm:px-10 rounded-lg">
        <div className="flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold my-2">
              Get <span className="text-orange-600">10%</span> off your order!
            </h1>
            <p className="text-sm sm:text-base lg:text-lg font-medium text-white">
              Enter your email and receive a 10% discount on your next order!
            </p>
          </div>
          <div className="w-full max-w-md mt-4">
            <div className="flex flex-row rounded-3xl my-2 overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none bg-white text-gray-600 text-sm sm:text-base px-4 py-3"
              />
              <button
                type="button"
                className="flex items-center justify-center bg-orange-500 px-5 text-sm sm:text-base font-semibold text-white"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
        
        </>
    )
}