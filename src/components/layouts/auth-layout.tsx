import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Head } from '@/components/seo';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { ShoppingBag } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate(redirectTo ? redirectTo : paths.app.store.getHref(), {
        replace: true,
      });
    }
  }, [user.data, navigate, redirectTo]);

  return (
    <>
      <Head title={title} />
      <div className="relative flex min-h-screen">
        <div className="relative hidden w-1/2 flex-col bg-gradient-to-b from-indigo-600 to-purple-700 lg:flex">
          <div className="relative flex h-full flex-col items-center justify-center p-12">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
            <div className="relative">
              <div className="mb-8 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-white" />
                <span className="ml-3 text-3xl font-bold text-white">ProductVista</span>
              </div>
              <blockquote className="space-y-2">
                <p className="text-lg text-white">
                  "Discover the finest selection of premium products, curated just for you."
                </p>
                <footer className="text-sm text-indigo-200">Premium Shopping Experience</footer>
              </blockquote>
            </div>
            <div className="absolute bottom-0 left-0 right-0 hidden h-48 bg-gradient-to-t from-indigo-700 to-transparent lg:block" />
          </div>
        </div>

        <div className="flex min-h-screen w-full flex-col justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:w-1/2">
          <div className="mx-auto w-full max-w-md">
            <div className="flex flex-col items-center">
              <Link to={paths.home.getHref()} className="mb-4 flex items-center lg:hidden">
                <ShoppingBag className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-slate-900">ProductVista</span>
              </Link>

              <h2 className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center text-3xl font-extrabold tracking-tight text-transparent">
                {title}
              </h2>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-slate-50 px-2 text-slate-500">Sign in to continue</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
