import React, { useEffect, useRef } from 'react';

function WakeLocker() {
  const wakeLockRef = useRef(null);

  // Function to request the wake lock
  const requestWakeLock = async () => {
    try {
      const wakeLock = await navigator.wakeLock.request('screen');
      wakeLockRef.current = wakeLock;

      // Listen for release events
      wakeLock.addEventListener('release', () => {
        console.log('Wake Lock was released');
      });
      console.log('Wake Lock acquired');
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };

  // Function to release the wake lock
  const releaseWakeLock = async () => {
    if (wakeLockRef.current !== null) {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
      console.log('Wake Lock released manually');
    }
  };

  // Handle visibility change
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
  };

  useEffect(() => {
    // Initial wake lock request
    requestWakeLock();

    // Listen for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function to release the lock and remove listeners
    return () => {
      releaseWakeLock();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}

export default WakeLocker;
