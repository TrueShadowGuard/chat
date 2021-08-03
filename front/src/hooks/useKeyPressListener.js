import React from 'react';

export default function useKeyPressListener(keycode, callback) {
  React.useEffect(() => {
    const listener = e => {
      if(e.code === keycode) {
        callback();
      }
    }
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  });
}
