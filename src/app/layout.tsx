import { Inter } from 'next/font/google';

import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import RentModal from '@/components/modals/RentModal';
import Navbar from '@/components/navbar/Navbar';
import ToasterProvider from '@/providers/ToasterProvider';

import getCurrentUser from './actions/getCurrentUser';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
