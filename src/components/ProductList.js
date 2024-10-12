const getProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      cache: "no-store",
    });

    console.log("Response Status:", res.status); // Log the response status

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await res.json();
    console.log("API Data:", JSON.stringify(data, null, 2)); // Log the entire data structure
    return Array.isArray(data) ? data : []; // Return books directly if it's an array
  } catch (error) {
    console.error("Error loading books:", error.message); // Log the error message
    return []; // Return an empty array in case of error
  }
};

export default async function ProductsList() {
  const books = await getProducts();
  console.log("books Array Length:", books.length); // Check if books array is populated
  console.log("books List:", books); // Check the books list

  if (books.length === 0) {
    return <div>No books found or failed to load books.</div>; // Show a message if no books
  }

  return (
    <div className="font-sans max-h-[580px] overflow-x-auto overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Ratings
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {Array.isArray(books) &&
            books.map((book) => {
              return (
                <tr key={book._id}>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {book?.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {book?.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {book.author}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    ${book.price.toFixed(2)} {/* Formatting price */}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {book.ratings}
                  </td>
                  {/* <td className="flex px-4 py-4 text-sm text-gray-800">
                    <Link href={`/dashboard/editbooks/${book._id}`}>
                      <HiPencilAlt size={24} />
                    </Link>
                    <RemoveBtn id={book._id} />
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
