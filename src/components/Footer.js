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
    <div className="">
      <footer className="footer bg-[#282828] text-base-content py-10 lg:px-40">
        <aside className="text-white">
          <p>
            <span className="text-3xl font-semibold text-orange-600 flex items-center">
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

        <nav>
          <h6 className="footer-title text-white">Need Help</h6>
          <h2 className="text-2xl text-orange-600 font-semibold">
            8802136548566
          </h2>
          <a className="text-white">Monday – Friday: 9:00-20:00</a>
          <a className="text-white">Saturday: 11:00 – 15:00</a>
          <h2 className="text-xl text-white">contact@example.com</h2>
        </nav>

        <nav>
          <h6 className="footer-title text-white">Services</h6>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Branding
          </Link>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Design
          </Link>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Marketing
          </Link>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Advertisement
          </Link>
        </nav>

        <nav>
          <h6 className="footer-title text-white">Company</h6>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            About us
          </Link>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Contact
          </Link>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Jobs
          </Link>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Press kit
          </Link>
        </nav>

        <nav>
          <h6 className="footer-title text-white">Legal</h6>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Terms of use
          </Link>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Privacy policy
          </Link>
          <Link
            href="#"
            className="link no-underline hover:text-orange-600 text-white"
          >
            Cookie policy
          </Link>
        </nav>
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
