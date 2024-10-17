"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/share/banner";
import Link from "next/link";

export default function TermsOfUse() {
  return (
    <>
      <Navbar />
      <Banner title="Terms of Use" linkName="Home" />
      <div className="bg-gray-100 p-6 md:p-20">
        <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
        <p className="mt-2 text-gray-700">
          By accessing or using the BookNest website, you agree to comply with
          and be bound by these Terms of Use. If you do not agree with any part
          of these terms, you must not use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. Changes to Terms</h2>
        <p className="mt-2 text-gray-700">
          We reserve the right to update or change these Terms of Use at any
          time. Your continued use of the site after any changes constitutes
          acceptance of those changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          3. User Responsibilities
        </h2>
        <p className="mt-2 text-gray-700">
          Users are responsible for their own actions while using the BookNest
          website. You agree to use the site for lawful purposes only and to
          comply with all applicable laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          4. Intellectual Property
        </h2>
        <p className="mt-2 text-gray-700">
          All content on the BookNest website, including text, graphics, logos,
          and images, is the property of BookNest or its content suppliers and
          is protected by copyright and other intellectual property laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          5. Limitation of Liability
        </h2>
        <p className="mt-2 text-gray-700">
          In no event shall BookNest be liable for any indirect, incidental,
          special, consequential, or punitive damages arising from your use of
          the site or any content therein.
        </p>

        <h2 className="text-2xl font-semibold mt-8">6. Governing Law</h2>
        <p className="mt-2 text-gray-700">
          These Terms of Use shall be governed by and construed in accordance
          with the laws of the jurisdiction in which BookNest operates, without
          regard to its conflict of law principles.
        </p>

        <h2 className="text-2xl font-semibold mt-8">7. Contact Information</h2>
        <p className="mt-2 text-gray-700">
          If you have any questions about these Terms of Use, please contact us
          at{" "}
          <Link href="/contact">
            <button className="px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold flex justify-center items-center">
              Contact Us
            </button>
          </Link>
        </p>

        <h2 className="text-2xl font-semibold mt-8">8. Last Updated</h2>
        <p className="mt-2 text-gray-700">
          These Terms of Use were last updated on [14.10.2024].
        </p>
      </div>
      <Footer />
    </>
  );
}
