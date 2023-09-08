import React, { useEffect, useState } from 'react';

export default function useMuteTimeSave() {
  const [mute, setMute] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('mute')) {
      const now = new Date();
      const muteTime = localStorage.getItem('mute');
      const timeDiff = parseInt(muteTime as string, 10) - now.getTime();

      if (timeDiff > 0) {
        setMute(true);
        setTimeout(() => {
          localStorage.removeItem('mute');
          setMute(false);
        }, timeDiff);
      } else localStorage.removeItem('mute');
    }
  }, []);

  return { mute, setMute };
}
