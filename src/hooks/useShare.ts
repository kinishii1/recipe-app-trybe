import { useState } from 'react';

export const useShare = (): any => {
  const [copyStatus, setCopyStatus] = useState<string>('');

  const handleShareClick = async () => {
    let url = window.location.href;
    url = url.replace(/\/in-progress$/, '');
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
