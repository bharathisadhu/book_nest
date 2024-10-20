import Link from "next/link";
export default function SSLSuccess() {
  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen ">
        <p className="my-2 text-[6vh] text-md text-green-500 ">
          Payment Successfully Done !{" "}
        </p>

        <Link className="text-blue-500 text-lg pt-6  " href="/">
          Back to home SSLSuccess
        </Link>
      </main>
    </>
  );
}
