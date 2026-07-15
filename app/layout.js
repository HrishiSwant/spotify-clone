import './globals.css';
import Providers from '@/components/Providers';

export const metadata = { title: 'Spotify Clone' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
