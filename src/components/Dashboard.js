import RootLayout from '@/app/layout';
import Image from 'next/image';
import React from 'react';

const Dashboard = () => {
  return (
    <RootLayout showNavbar={false} showFooter={false}>
        <nav className="bg-[#121e31] h-screen fixed top-0 left-0 py-6 font-[sans-serif] overflow-auto">
      <div className="flex flex-col flex-wrap items-center cursor-pointer px-4">
        <Image
        height={200}
        width={200}
          src="https://i.ibb.co.com/XWyS1WL/d.jpg"
          className="w-12 h-12 rounded-full border-2 border-white"
          alt="Profile"
        />
        <div className="mt-2 text-center">
          <p className="text-sm text-white mt-2">John Doe</p>
          <p className="text-xs text-gray-300 mt-0.5">johndoe23@gmail.com</p>
        </div>
      </div>

      <ul className="space-y-1 mt-10">
        {[
          { name: 'Dashboard', icon: 'svg1_path', href: '/dashboard' },
          { name: 'Insight', icon: 'svg2_path', href: '/insight' },
          { name: 'Product', icon: 'svg3_path', href: '/product' },
          { name: 'Inbox', icon: 'svg4_path', href: '/inbox' },
          { name: 'Refunds', icon: 'svg5_path', href: '/refunds' },
          { name: 'Profile', icon: 'svg6_path', href: '/profile' },
        ].map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="text-white text-sm flex flex-col items-center hover:bg-[#22284f] rounded px-4 py-5 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mb-3" viewBox="0 0 512 512">
                <path d={item.icon} />
              </svg>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
    </RootLayout>
  );
};

export default Dashboard;
