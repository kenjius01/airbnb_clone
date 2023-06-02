import { Nunito } from 'next/font/google';

import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import RentModal from '@/components/modals/RentModal';
import SearchModal from '@/components/modals/SearchModal';
import Navbar from '@/components/navbar/Navbar';
import ToasterProvider from '@/providers/ToasterProvider';

import getCurrentUser from './actions/getCurrentUser';

import './globals.css';

const font = Nunito({
  subsets: ['latin']
});

export const metadata = {
  title: 'AirBnB',
  description: 'AirBnB clone'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  );
}
