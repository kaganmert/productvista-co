import { ShoppingBag } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-lg font-semibold text-slate-900">ProductVista</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ProductVista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
