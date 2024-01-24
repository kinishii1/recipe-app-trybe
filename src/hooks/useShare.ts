import { useState } from 'react';

export const useShare = (): any => {
  const [copyStatus, setCopyStatus] = useState<string>('');

  const handleShareClick = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus('Link copied!');
      setTimeout(() => setCopyStatus(''), 3000);
    } catch (err) {
      setCopyStatus('Failed to copy link');
    }
  };

  return { handleShareClick, copyStatus };
};
