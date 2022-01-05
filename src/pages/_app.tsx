import 'styles/global.css';
import 'styles/core.css';
import 'react-loading-skeleton/dist/skeleton.css';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('@pages/App'), {
  ssr: false,
});

export default App;
