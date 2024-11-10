import { useNavigate } from 'react-router-dom';
import { useUser } from '@/lib/auth';
import { paths } from '@/config/paths';
import { Head } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star, Shield, Gift } from 'lucide-react';
import { Footer } from '@/components/layouts/template/footer';

export const LandingRoute = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleStart = () => {
    if (user.data) {
      navigate(paths.app.store.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  };
  const features = [
    {
      title: 'Premium Products',
      description: 'Curated selection of high-quality products',
      icon: Star,
    },
    {
      title: 'Secure Shopping',
      description: 'Safe and protected transactions',
      icon: Shield,
    },
    {
      title: 'Special Offers',
      description: 'Exclusive deals for our members',
      icon: Gift,
    },
  ];

  return (
    <>
      <Head description="Welcome to ProductVista - Your Premium Shopping Destination" />
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
        <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-slate-900">ProductVista</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate(paths.auth.login.getHref())}>
                Sign In
              </Button>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <div className="relative pt-16">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
              <div className="text-center">
                <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                  Discover Premium Shopping
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                  Experience a curated collection of premium products, designed for those who
                  appreciate quality and elegance.
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <Button
                    onClick={handleStart}
                    size="lg"
                    className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700"
                  >
                    <span>Sign In</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};
