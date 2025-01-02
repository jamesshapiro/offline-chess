import Header from '../Header';
import React from 'react';

import DataProvider from '../DataProvider';
import UserProvider from '../UserProvider';
import WakeLocker from '../WakeLocker';

function App() {
  return (
    // <UserProvider>
    <DataProvider>
      <div className='wrapper'>
        <WakeLocker />
        <Header />
      </div>
    </DataProvider>
    // </UserProvider>
  );
}

export default App;
