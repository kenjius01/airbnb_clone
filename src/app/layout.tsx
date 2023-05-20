import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import Modal from '@/components/modals/Modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AirBnB',
  description: 'AirBnB clone'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Modal isOpen={true} title='Hello' actionLabel={'Submit'} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
