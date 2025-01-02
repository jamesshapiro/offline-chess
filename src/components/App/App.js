import Header from '../Header';
import React from 'react';

import DataProvider from '../DataProvider';
import UserProvider from '../UserProvider';

function App() {
  return (
    // <UserProvider>
    <DataProvider>
      <div className='wrapper'>
        <Header />
      </div>
    </DataProvider>
    // </UserProvider>
  );
}

export default App;
