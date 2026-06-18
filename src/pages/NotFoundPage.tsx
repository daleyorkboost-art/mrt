import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PageShell } from '../components/PageShell';

export function NotFoundPage() {
  return (
    <PageShell>
      <section className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 pb-20 text-center sm:px-6">
        <Card className="p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">404</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white">This journey is not on the map</h1>
          <p className="mt-4 leading-7 text-mist">The page you are looking for does not exist or has moved.</p>
          <Link to="/">
            <Button className="mt-7">Return home</Button>
          </Link>
        </Card>
      </section>
    </PageShell>
  );
}
