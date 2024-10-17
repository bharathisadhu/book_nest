"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/share/banner";
import Link from "next/link";

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <Banner title="Cookie Policy" linkName="Home" />
      <div className="bg-gray-100 p-6 md:p-20">
        <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
        <p className="mt-2 text-gray-700">
          This Cookie Policy explains how BookNest ("we," "us," or "our") uses
          cookies and similar technologies when you visit our website and use
          our services. By continuing to use our website, you consent to the use
          of cookies as outlined in this policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. What Are Cookies?</h2>
        <p className="mt-2 text-gray-700">
          Cookies are small text files that are stored on your device when you
          visit a website. They help the website remember your actions and
          preferences (such as login details and language selection) over a
          period of time, so you don’t have to re-enter them whenever you return
          to the site.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          3. Types of Cookies We Use
        </h2>
        <p className="mt-2 text-gray-700">
          We use the following types of cookies on our website:
          <ul className="list-disc ml-8 mt-2">
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary
              for the website to function properly and cannot be disabled in our
              systems. They are usually set in response to actions you take,
              such as setting your privacy preferences or logging in.
            </li>
            <li>
              <strong>Authentication Cookies:</strong> We use cookies
              (specifically JWS tokens) to manage user authentication. These
              cookies ensure you remain logged in while using our services and
              are essential for a seamless user experience.
            </li>
            <li>
              <strong>Performance Cookies:</strong> These cookies collect
              information about how visitors use our website, such as which
              pages are most frequently visited. This helps us improve our
              website and the services we offer.
            </li>
            <li>
              <strong>Functional Cookies:</strong> These cookies allow our
              website to remember choices you make (such as your username and
              language) and provide enhanced, more personal features.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> We may also use cookies to
              serve ads that are relevant to you and your interests.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mt-8">4. How We Use Cookies</h2>
        <p className="mt-2 text-gray-700">
          We use cookies for the following purposes:
          <ul className="list-disc ml-8 mt-2">
            <li>To enable essential features of our website and services.</li>
            <li>
              To remember your login information and keep you logged in
              securely.
            </li>
            <li>
              To analyze how users interact with our website and improve user
              experience.
            </li>
            <li>
              To personalize content and advertisements based on your interests.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          5. Managing Your Cookie Preferences
        </h2>
        <p className="mt-2 text-gray-700">
          You can manage your cookie preferences through your browser settings.
          Most web browsers allow you to refuse cookies or alert you when
          cookies are being sent. Please note that if you disable cookies, some
          parts of our website may not function properly.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          6. Changes to This Cookie Policy
        </h2>
        <p className="mt-2 text-gray-700">
          We may update our Cookie Policy from time to time. We will notify you
          of any changes by posting the new Cookie Policy on this page. You are
          advised to review this Cookie Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8">7. Contact Us</h2>
        <p className="mt-2 text-gray-700">
          If you have any questions or concerns about this Cookie Policy, please
          contact us at{" "}
          <Link href="/contact">
            <button className="px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold flex justify-center items-center">
              Contact Us
            </button>
          </Link>
        </p>

        <h2 className="text-2xl font-semibold mt-8">8. Last Updated</h2>
        <p className="mt-2 text-gray-700">
          This Cookie Policy was last updated on [Insert Date].
        </p>
      </div>
      <Footer />
    </>
  );
}
