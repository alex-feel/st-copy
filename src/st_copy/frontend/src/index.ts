import { FrontendRenderer, FrontendRendererArgs } from '@streamlit/component-v2-lib';
import './CopyButton.css';

/*
 * st-copy frontend for Streamlit Custom Components v2 (frameless, no React).
 *
 * Streamlit mounts the HTML skeleton declared in `src/st_copy/__init__.py`
 * (the `.st-copy-btn` button with `.st-copy-icon` and `.st-copy-label` spans)
 * into `parentElement` (a ShadowRoot when `isolate_styles=True`). This renderer
 * fills the dynamic content, wires the click handler, and reports the copy
 * result back to Python as the `copied` trigger value. The class names here
 * MUST stay in sync with the skeleton in `src/st_copy/__init__.py` and the
 * selectors in `CopyButton.css`.
 */

const CLIPBOARD_UNAVAILABLE_MSG = 'Clipboard API not available';
const COPIED_RESET_MS = 1_000;

// Google Material "content_copy" icon (18px).
const MATERIAL_SYMBOLS_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">' +
  '<path d="M360-240q-29.7 0-50.85-21.15Q288-282.3 288-312v-480q0-29.7 21.15-50.85Q330.3-864 360-864h384q29.7 0 50.85 21.15Q816-821.7 816-792v480q0 29.7-21.15 50.85Q773.7-240 744-240H360Zm0-72h384v-480H360v480ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-552h72v552h456v72H216Zm144-216v-480 480Z" />' +
  '</svg>';

// Native Streamlit code-block icon (16px).
const ST_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>' +
  '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
  '</svg>';

interface CopyButtonData {
  text: string;
  icon?: string;
  tooltip?: string;
  copied_label?: string;
}

interface CopyButtonState extends Record<string, unknown> {
  copied: boolean;
}

interface Instance {
  data: CopyButtonData;
  setTriggerValue: FrontendRendererArgs<CopyButtonState, CopyButtonData>['setTriggerValue'];
  resetTimer: number | null;
  onClick: () => void;
}

const instances = new WeakMap<HTMLElement | ShadowRoot, Instance>();

/** Copy `payload` to the clipboard, falling back to execCommand when needed. */
async function tryCopy(payload: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(payload);
    return true;
  }
  console.warn(CLIPBOARD_UNAVAILABLE_MSG);
  const textarea = document.createElement('textarea');
  textarea.value = payload;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  return ok;
}

const CopyButton: FrontendRenderer<CopyButtonState, CopyButtonData> = (component) => {
  const { parentElement, data, setTriggerValue } = component;

  const button = parentElement.querySelector<HTMLButtonElement>('.st-copy-btn');
  if (!button) {
    throw new Error('st-copy: button root element not found');
  }
  const iconSlot = button.querySelector<HTMLElement>('.st-copy-icon');
  const labelSlot = button.querySelector<HTMLElement>('.st-copy-label');

  // Refresh dynamic content on every rerun (the payload may change between runs).
  if (iconSlot) {
    iconSlot.innerHTML = data.icon === 'st' ? ST_ICON : MATERIAL_SYMBOLS_ICON;
  }
  if (labelSlot) {
    labelSlot.textContent = data.copied_label ?? 'Copied!';
  }
  button.title = data.tooltip ?? 'Copy';

  let instance = instances.get(parentElement);
  if (instance) {
    // Keep the latest inputs so the once-bound handler reads fresh values.
    instance.data = data;
    instance.setTriggerValue = setTriggerValue;
  } else {
    const created: Instance = {
      data,
      setTriggerValue,
      resetTimer: null,
      onClick: () => undefined,
    };

    created.onClick = async () => {
      const current = instances.get(parentElement);
      if (!current) {
        return;
      }
      if (current.resetTimer !== null) {
        clearTimeout(current.resetTimer);
        current.resetTimer = null;
      }
      let copied = false;
      try {
        copied = await tryCopy(current.data.text);
      } catch (error) {
        console.warn('Clipboard operation failed:', error);
        copied = false;
      }
      current.setTriggerValue('copied', copied);
      if (copied) {
        button.classList.add('button--copied');
        current.resetTimer = window.setTimeout(() => {
          button.classList.remove('button--copied');
          current.resetTimer = null;
        }, COPIED_RESET_MS);
      }
    };

    instances.set(parentElement, created);
    button.addEventListener('click', created.onClick);
    instance = created;
  }

  const bound = instance;
  return () => {
    if (bound.resetTimer !== null) {
      clearTimeout(bound.resetTimer);
      bound.resetTimer = null;
    }
    button.removeEventListener('click', bound.onClick);
    instances.delete(parentElement);
  };
};

export default CopyButton;
