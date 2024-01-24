import { useState } from 'react';

export const useShare = (): any => {
  const [copyStatus, setCopyStatus] = useState<string>('');

  const handleShareClick = async (id: number = 0, isDrink: boolean = false) => {
    let url;
    url = window.location.href;
    url = url.replace(/\/in-progres$/, '');
    if (id > 0) {
      if (isDrink) {
        url = `${window.location.origin}/drinks/${id}`;
      } else {
        url = `${window.location.origin}/meals/${id}`;
      }
    }
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
