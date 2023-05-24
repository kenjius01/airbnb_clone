import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import RegisterModal from '@/components/modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

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
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
