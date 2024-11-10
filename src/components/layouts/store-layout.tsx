import { Link } from 'react-router-dom';
import { User2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/lib/auth';
import { cn } from '@/utils/cn';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown';
import { Footer } from './template/footer';

export function StoreLayout({ children }: { children: React.ReactNode }) {
  const logout = useLogout();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col">
        <div className="w-full border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl w-full">
            <header className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center">
                  <ShoppingBag className="h-6 w-6 text-indigo-600" />
                  <span className="ml-2 text-lg font-semibold text-slate-900">ProductVista</span>
                </Link>
                <nav>
                  <Link 
                    to="/shop" 
                    className="text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Shop
                  </Link>
                </nav>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <span className="sr-only">Open user menu</span>
                    <User2 className="size-6 rounded-full" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                    onClick={() => logout.mutate({})}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
          </div>
        </div>
        <main className="mx-auto max-w-7xl w-full grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-8 md:gap-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}