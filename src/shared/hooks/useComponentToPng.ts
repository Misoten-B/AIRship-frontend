import { toPng } from 'html-to-image';
import { useCallback, useRef } from 'react';

/**
 * コンポーネントをpngに変換してダウンロードするフック
 * @param filename example: 'my-image'
 * @returns
 */
export const useComponentToPng = <T extends HTMLElement>(filename: string) => {
  const ref = useRef<T>(null);

  const download = useCallback(async () => {
    if (!ref.current) return;

    const url = await toPng(ref.current, { cacheBust: true });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = url;
    link.click();
  }, [ref, filename]);

  return { ref, download };
};
