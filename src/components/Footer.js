import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import Image from "next/image"; // Next.js Image component
import Link from "next/link"; // Next.js Link for client-side navigation
import logo from "../../public/BookNest.png"; // Ensure the image is in the public folder

const Footer = () => {
  return (
    <div className="mt-10">
      <footer className="footer bg-[#282828] text-base-content py-10 lg:px-24">
        <aside className="text-white flex flex-col justify-center md:justify-start items-center md:items-start mx-auto">
          <p>
            <span className="text-3xl font-semibold text-orange-600 flex items-center md:items-start">
              <Image
                src={logo}
                alt="BookNest Logo"
                width={200}
                height={50}
                className="w-[200px]"
              />
            </span>
            <br />
            Providing reliable tech since 1992
          </p>
          <p className="uppercase underline font-semibold">Show on map</p>
          <div className="flex gap-2">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaPinterest />
          </div>
        </aside>

        {/* need help and services div */}
        <div className="flex justify-between md:justify-normal md:gap-6 lg:gap-40 px-2 w-full">
          <nav className="flex flex-col space-y-3">
            <h6 className="footer-title text-white">Need Help</h6>
            <h2 className="md:text-2xl text-orange-600 font-semibold">
              8802136548566
            </h2>
            <a className="text-white">Monday – Friday: 9:00-20:00</a>
            <a className="text-white">Saturday: 11:00 – 15:00</a>
            <h2 className="md:text-xl text-white">contact@example.com</h2>
          </nav>
          {/* services nav */}
          <nav className="flex flex-col space-y-2 items-end md:items-start">
            <h6 className="footer-title text-white">Services</h6>
            <Link
              href="/branding"
              className="link no-underline hover:text-orange-600 text-white"
            >
              Branding
            </Link>
            <Link
              href="/design"
              className="link no-underline hover:text-orange-600 text-white"
            >
              Design
            </Link>
            <Link
              href="/advertisement"
              className="link no-underline hover:text-orange-600 text-white"
            >
              Advertisement
            </Link>
          </nav>
        </div>
        {/* company and legal div */}
        <div className="flex justify-between md:justify-normal md:gap-6 lg:gap-40 px-2 w-full">
          {/* company section */}
          <nav className="flex flex-col space-y-3">
            <h6 className="footer-title text-white">Company</h6>
            <Link
              href="/about"
              className="link no-underline hover:text-orange-600 text-white"
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="link no-underline hover:text-orange-600 text-white"
            >
              Contact
            </Link>
            <Link
              href="/jobs"
              className="link no-underline hover:text-orange-600 text-white"
            >
              Jobs
            </Link>
          </nav>
          {/* legal section */}
          <nav className="flex flex-col space-y-3">
            <h6 className="footer-title text-white">Legal</h6>
            <Link
              href="/terms"
              className="link no-underline hover:text-orange-600 text-white"
            >
              Terms of use
            </Link>
            <Link
              href="/privacy"
              className="link no-underline hover:text-orange-600 text-white"
            >
              Privacy policy
            </Link>
            <Link
              href="/cookies"
              className="link no-underline hover:text-orange-600 text-white"
            >
              Cookie policy
            </Link>
          </nav>
        </div>
      </footer>

      <hr />

      <footer className="footer bg-[#282828] text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-orange-600">BookNest</span> - All rights
            reserved
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <FaTwitter />
          </a>
          <a>
            <FaPinterest />
          </a>
          <a>
            <FaFacebook />
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
