import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="font-bold text-xl">moon19ht</div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/projects" className="hover:underline">Projects</Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
