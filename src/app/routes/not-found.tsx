import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';

export const NotFoundRoute = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 text-center">
      <div className="rounded-xl border border-slate-200/60 bg-white/80 p-12 backdrop-blur-sm">
        <h1 className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-6xl font-bold text-transparent">
          404
        </h1>
        <h2 className="mb-6 text-2xl font-semibold text-slate-800">Page Not Found</h2>
        <p className="mb-8 text-slate-600">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to={paths.home.getHref()}
          replace
          className="inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};
