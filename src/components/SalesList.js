


const getPayments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
        cache: "no-store",
      });
  
      console.log("Response Status:", res.status); // Log the response status
  
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
  
      const data = await res.json();
      console.log("API Data:", JSON.stringify(data, null, 2)); // Log the entire data structure
      return Array.isArray(data.users) ? data.users : data || []; // Adjust according to your API response structure
      
    } catch (error) {
      console.error("Error loading payments:", error.message); // Log the error message
      return []; // Return an empty array in case of error
    }
  };

export default async function  SalesList () {

    const payments = await getPayments();
  console.log("Payment Array Length:", payments.length); 
  console.log("Payment List:", payments); 

  if (payments.length === 0) {
    return <div className="text-2xl font-bold text-[#F65D4E] my-10 text-center">No users found or failed to load users.</div>; // Show a message if no users
  }


    return(
        <div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              TransactionId
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {Array.isArray(payments) &&
            payments.map((pay) => (
              <tr key={pay.id}>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {pay?.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {pay.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {parseFloat(pay.price).toFixed(2)} $
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">{pay.date}</td>

                <td className="px-4 py-4 text-sm text-gray-800">{pay.transactionId}</td>
                
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    )
}