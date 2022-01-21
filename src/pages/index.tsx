import dynamic from 'next/dynamic';

const Landing = dynamic(() => import('@pages/Landing'), {
  ssr: false,
});

export default Landing;
