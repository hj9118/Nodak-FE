import { PropsWithChildren } from 'react';

import Link from 'next/link';

import Icon from '@/src/components/Icon';

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex items-center justify-between p-4'>{children}</div>
  );
};

const NavMore = () => (
  <Icon id='nav-more' size={24} className='cursor-pointer' />
);

const BackButton = ({ href }: { href: string }) => (
  <Link href={href}>
    <Icon id='arrow-left' size={24} className='cursor-pointer' />
  </Link>
);

const ReportButton = () => (
  <Icon id='notification' size={24} className='text-red-500' />
);

const DarkModeButton = () => <Icon id='moon-fill' size={24} />;

const SearchButton = () => <Icon id='search' size={24} />;

const NotificationButton = () => <Icon id='notification' size={24} />;

const Title = ({ children }: PropsWithChildren) => (
  <div className='cursor-default px-4 py-2.5 font-bold'>{children}</div>
);
const TopBar = {
  Container,
  BackButton,
  ReportButton,
  DarkModeButton,
  SearchButton,
  NotificationButton,
  Title,
  NavMore,
};

export default TopBar;
