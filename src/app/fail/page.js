import Link from "next/link";
export default function Fail() {
  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen ">
        <p className="my-2 text-[6vh] text-md text-red-500 ">Payment Fail ! </p>

        <Link className="text-blue-500 text-lg pt-6 " href="/">
          Try Again
        </Link>
      </main>
    </>
  );
}

