'use client'
import {
  HomeIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  
  { name: 'Posts', href: '/blog/insert', icon: EnvelopeIcon },
];

export default function NavLinks() {
  //get the current path from the URL
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        //const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-purple-100 md:flex-none md:justify-start md:p-2 md:px-3',
              pathname === link.href ? 'bg-purple-100' : ''
            )}
            >
            <p className="text-black md:text-black font-bold">{link.name}</p>
          </Link>
        );
      })}

    </>
  );
}
