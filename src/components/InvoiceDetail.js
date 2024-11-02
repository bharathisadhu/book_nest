// components/InvoiceDetail.js
import React, { forwardRef } from "react";
import logo from "../../public/BookNest.png";
import Image from "next/image";

const InvoiceDetail = forwardRef(({ invoice }, ref) => {
  if (!invoice) return null;

  return (
    <div ref={ref} className="invoice-detail p-6 bg-white shadow-lg rounded-lg">

      <div className="flex justify-between mb-6 border-b border-gray-300 pb-4">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">Invoice #{invoice._id}</h2>
          <h2 className="text-lg text-gray-600">Customer Name: {invoice.name}</h2>
          <h2 className="text-lg text-gray-600">Shipping Address:</h2>
          <p className="text-gray-500">{invoice?.address}, {invoice?.city}, {invoice?.country}</p>
          <h2 className="text-lg text-gray-600">Status: <span className="font-semibold text-green-600">{invoice?.status}</span></h2>
        </div>

        <div className="flex flex-col items-end">
          <Image
            width={1000}
            height={1000}
            src={logo}
            alt="logo"
            className="md:w-[170px] w-32 mb-2"
          />
          <p className="text-sm text-gray-500">Email: booknest21@gmail.com</p>
        </div>

      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">SL</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Book Name</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit Price</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(invoice?.books) &&
            invoice?.books.map((book, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm text-gray-800 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{book?.bookName}</td>
                <td className="px-4 py-2 text-sm text-gray-800 text-right">{book?.quantity}</td>
                <td className="px-4 py-2 text-sm text-gray-800 text-right">${book?.price.toFixed(2)}</td>
                <td className="px-4 py-2 text-sm text-gray-800 text-right">${(book?.quantity * book?.price).toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
        <tfoot className="bg-gray-100">
          <tr>
            <td colSpan="4" className="text-right px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Price</td>
            <td className="text-right px-4 py-2 text-sm text-gray-800">${invoice?.totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

    </div>
  );
});

export default InvoiceDetail;



















// // components/InvoiceDetail.js
// import React, { forwardRef } from "react";
// import logo from "../../public/BookNest.png";
// import Image from "next/image";

// const InvoiceDetail = forwardRef(({ invoice }, ref) => {
//   if (!invoice) return null;

//   return (
//     <div ref={ref} className="invoice-detail">

//       <div className="justify-between flex">

//             <div>

//             <h2>Invoice #{invoice._id}</h2>
//       <h2>Customer Name #{invoice.name}</h2>
//       <h2>Shipping Address:</h2>
//        {invoice?.name}, {invoice?.address}, {invoice?.city}, {invoice?.country}
      
//       <h2>Status:{invoice?.status}</h2>


//             </div>

//             <div>
//             <Image
//             width={1000}
//             height={1000}
//             src={logo}
//             alt="logo"
//             className="md:w-[170px] w-32 -ml-4"
//           />

//           email:booknest21@gmail.com



//           </div>

//       </div>

    
     
     
     


//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-100 whitespace-nowrap">
//           <tr>
//           <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               SL
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               BooK Name
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               quantity
//             </th>

//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Unit price
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               price
//             </th>
            
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
//           {Array.isArray(invoice?.books) &&
//             invoice?.books?.map((book,index) => (
//                <tr key={index}>
//         {/* Serial Number */}
//         <td className="px-4 py-4 text-sm text-gray-800 text-center">
//           {index + 1} {/* Serial number starts from 1 */}
//         </td>
//                 <td className="px-4 py-4 text-sm text-gray-800">
//                  {book?.bookName}
//                 </td>
//                  <td className="px-4 py-4 text-sm text-gray-800 text-right">
//                  {book?.quantity}
//                 </td>
//                  <td className="px-4 py-4 text-sm text-gray-800 text-right">
//                  {book?.price}
//                 </td>
//                  <td className="px-4 py-4 text-sm text-gray-800 text-right">
//                  {book?.quantity*book?.price}
//                 </td>
                
//               </tr>
//             ))}
//         </tbody>

//         <tfoot className="bg-gray-100 whitespace-nowrap">
//             <tr>

//             <td colSpan="4" className="text-right px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Price</td>
//             <td className="text-right"> ${invoice?.totalAmount.toFixed(2)}</td>


//             </tr>
//         </tfoot>

//       </table>



//     </div>
//   );
// });

// export default InvoiceDetail;