"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/share/banner";
import { Link } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <Banner title="Privacy Policy" linkName="Home" />
      <div className="bg-gray-100 p-6 md:p-20">
        <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
        <p className="mt-2 text-gray-700">
          At BookNest, we are committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and safeguard your information
          when you visit our website and use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          2. Information We Collect
        </h2>
        <p className="mt-2 text-gray-700">
          We may collect the following types of information:
          <ul className="list-disc ml-8 mt-2">
            <li>
              Personal Information: Name, email address, and other contact
              details.
            </li>
            <li>
              Usage Data: Information about how you use our website, such as
              your IP address, browser type, and pages visited.
            </li>
            <li>
              Cookies: Small data files stored on your device that help us
              improve your experience on our site.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          3. How We Use Your Information
        </h2>
        <p className="mt-2 text-gray-700">
          We use your information for the following purposes:
          <ul className="list-disc ml-8 mt-2">
            <li>To provide and maintain our services.</li>
            <li>
              To communicate with you, including sending updates and promotional
              materials.
            </li>
            <li>
              To improve our website and services based on user feedback and
              behavior.
            </li>
            <li>To monitor the usage of our website and prevent fraud.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          4. Sharing Your Information
        </h2>
        <p className="mt-2 text-gray-700">
          We do not sell or rent your personal information to third parties.
          However, we may share your information in the following situations:
          <ul className="list-disc ml-8 mt-2">
            <li>
              With service providers who assist us in operating our website and
              providing services.
            </li>
            <li>
              When required by law or to protect our rights and the rights of
              others.
            </li>
            <li>
              In connection with a merger, sale, or acquisition of our business.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          5. Security of Your Information
        </h2>
        <p className="mt-2 text-gray-700">
          We take reasonable precautions to protect your personal information
          from unauthorized access, use, or disclosure. However, no method of
          transmission over the internet or electronic storage is completely
          secure, and we cannot guarantee its absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-8">6. Your Rights</h2>
        <p className="mt-2 text-gray-700">
          You have the right to:
          <ul className="list-disc ml-8 mt-2">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of any inaccurate information.</li>
            <li>
              Request deletion of your personal information, subject to certain
              exceptions.
            </li>
            <li>Opt out of marketing communications at any time.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          7. Changes to This Privacy Policy
        </h2>
        <p className="mt-2 text-gray-700">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8">8. Contact Us</h2>
        <p className="mt-2 text-gray-700">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at
          <Link href="/contact">
            <button className="px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold flex justify-center items-center">
              Contact Us
            </button>
          </Link>
        </p>

        <h2 className="text-2xl font-semibold mt-8">9. Last Updated</h2>
        <p className="mt-2 text-gray-700">
          This Privacy Policy was last updated on [14.10.2024].
        </p>
      </div>
      <Footer />
    </>
  );
}
