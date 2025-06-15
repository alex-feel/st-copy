import {
  withStreamlitConnection,
  Streamlit,
  ComponentProps,
} from 'streamlit-component-lib';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';  // => preact via alias
import './CopyButton.css';

const CLIPBOARD_UNAVAILABLE_MSG = 'Clipboard API not available';

function CopyButton({ args, theme }: ComponentProps) {
  const { text, icon, tooltip, copied_label } = args as {
    text: string;
    icon?: string;
    tooltip?: string;
    copied_label?: string;
  };

  /* flag for "Copied!" animation */
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    Streamlit.setFrameHeight();
  }, [copied]);

  /* clear timeout on unmount */
  useEffect(() => {
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  /* safest copy helper */
  const tryCopy = async (payload: string): Promise<boolean> => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(payload);
      return true;
    }
    console.warn(CLIPBOARD_UNAVAILABLE_MSG);
    const ta = document.createElement('textarea');
    ta.value = payload;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  };

  const onClick = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);

    try {
      if (!(await tryCopy(text))) throw new Error('copy failed');
      setCopied(true);
      timer.current = window.setTimeout(() => {
        setCopied(false);
        timer.current = null;
      }, 1_000);
    } catch (err) {
      console.warn('Clipboard operation failed:', err);
    }
  }, [text]);

  const iconElement = useMemo(() => {
    if (icon === "st") {
      // Native Streamlit code‑block icon
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      );
    }

    // Google Material "content_copy" icon (20px)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 -960 960 960"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M360-240q-29.7 0-50.85-21.15Q288-282.3 288-312v-480q0-29.7 21.15-50.85Q330.3-864 360-864h384q29.7 0 50.85 21.15Q816-821.7 816-792v480q0 29.7-21.15 50.85Q773.7-240 744-240H360Zm0-72h384v-480H360v480ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-552h72v552h456v72H216Zm144-216v-480 480Z" />
      </svg>
    );
  }, [icon]);

  return (
    <button
      data-testid="st-copy-btn"
      className={copied ? 'st-copy-btn button--copied' : 'st-copy-btn'}
      onClick={onClick}
      title={tooltip ?? 'Copy'}
      style={{ color: theme?.textColor }}
    >
      {iconElement}
      <span className="st-copy-label" aria-live="polite">
        {copied_label ?? 'Copied!'}
      </span>
    </button>
  );
}

export default withStreamlitConnection(CopyButton);
