import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import {
  ComponentProps,
  withStreamlitConnection,
  Streamlit,
} from "streamlit-component-lib";
import "./CopyButton.css";

// A bidirectional "copy to clipboard" button
function CopyButton({ args, theme }: ComponentProps) {
  const { text, icon, tooltip, copied_label } = args as {
    text: string;
    icon?: string;
    tooltip?: string;
    copied_label?: string;
  };

  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Initial height setup on mount and cleanup on unmount
  useEffect(() => {
    Streamlit.setFrameHeight();

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update height whenever copied state changes to prevent layout jumps
  useEffect(() => {
    Streamlit.setFrameHeight();
  }, [copied]);

  // Handle click → copy → visual feedback
  const copyHandler = useCallback(async () => {
    try {
      // Clear any existing timeout to prevent state conflicts
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      // Try to copy text to clipboard
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not available");
      }

      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the "copied" state after the short animation
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 1000);
    } catch (error) {
      console.warn("Clipboard operation failed:", error);
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
      className={copied ? "st-copy-btn button--copied" : "st-copy-btn"}
      onClick={copyHandler}
      title={tooltip ?? "Copy"}
      style={{ color: theme?.textColor }}
    >
      {iconElement}

      {/* Always in DOM, but hidden by default */}
      <span className="st-copy-label">
        {copied_label ?? "Copied!"}
      </span>
    </button>
  )
}

const ConnectedCopyButton = withStreamlitConnection(CopyButton);
export default ConnectedCopyButton;
