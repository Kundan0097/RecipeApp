import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { BsPhone } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* About Section */}
          <div>
            <h3 className="mb-6 text-xl font-bold">Recipe Haven</h3>
            <p className="text-gray-400">
              Discover, cook, and share delicious recipes from around the world. 
              Our mission is to inspire your culinary journey.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 transition hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 transition hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 transition hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 transition hover:text-white">
                <FaPinterest size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 transition hover:text-white">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/recipes" className="transition hover:text-white">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/categories" className="transition hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/popular" className="transition hover:text-white">
                  Popular Recipes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Cooking Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Newsletter</h4>
            <p className="mb-4 text-gray-400">
              Subscribe to get weekly recipe inspiration
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-lg bg-gray-700 px-4 py-3 text-white focus:outline-none"
                required
              />
              <button
                type="submit"
                className="rounded-r-lg bg-amber-600 px-4 py-3 font-medium transition hover:bg-amber-700"
              >
                Join
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <IoLocationOutline className="mr-3 mt-1" size={18} />
                <span>123 Culinary Street, Foodie City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <MdOutlineMail className="mr-3" size={18} />
                <a href="mailto:hello@recipehaven.com" className="hover:text-white">
                  hello@recipehaven.com
                </a>
              </li>
              <li className="flex items-center">
                <BsPhone className="mr-3" size={18} />
                <a href="tel:+1234567890" className="hover:text-white">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-800"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-gray-400">
            &copy; {currentYear} Recipe Haven. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;