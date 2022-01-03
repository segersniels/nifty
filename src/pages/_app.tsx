import 'styles/global.css';
import 'styles/core.css';
import 'react-loading-skeleton/dist/skeleton.css';

import React from 'react';

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
