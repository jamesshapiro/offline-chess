import Header from '../Header';
import React from 'react';

import DataProvider from '../DataProvider';
import WakeLocker from '../WakeLocker';
import Board from '../Board';

function App() {
  return (
    // <UserProvider>
    <DataProvider>
      <div className='wrapper'>
        <WakeLocker />
        <Board />
      </div>
    </DataProvider>
    // </UserProvider>
  );
}

export default App;
