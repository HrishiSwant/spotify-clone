import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';

export const metadata = {
  title: 'Spotify Clone'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
