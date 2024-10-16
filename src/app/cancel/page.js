import Link from "next/link";
function page() {
  return (
    <>
      <main className="flex justify-center items-center h-screen ">
        <h6 className="my-2 text-lg text-md text-red-500  ">Payment Cancel </h6>
        <Link
          className="text-blue-500 text-md border-b-2 border-blue-500  "
          href="/"
        >
          Try Again
        </Link>
      </main>
    </>
  );
}

export default page;