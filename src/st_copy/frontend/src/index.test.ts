import { describe, it, expect, vi } from 'vitest'
import CopyButton from './index'

// Mirrors the HTML skeleton declared in `src/st_copy/__init__.py`. Keep in sync.
const SKELETON = `
  <button type="button" class="st-copy-btn" data-testid="st-copy-btn">
    <span class="st-copy-icon" aria-hidden="true"></span>
    <span class="st-copy-label" aria-live="polite"></span>
  </button>
`

interface CopyData {
  text: string
  icon?: string
  tooltip?: string
  copied_label?: string
}

function mount(data: CopyData) {
  const parentElement = document.createElement('div')
  parentElement.innerHTML = SKELETON
  document.body.appendChild(parentElement)

  const setStateValue = vi.fn()
  const setTriggerValue = vi.fn()
  const args = {
    data,
    key: 'test-key',
    name: 'st-copy.st_copy',
    parentElement,
    setStateValue,
    setTriggerValue,
  } as unknown as Parameters<typeof CopyButton>[0]

  const cleanup = CopyButton(args)
  const button = parentElement.querySelector('.st-copy-btn') as HTMLButtonElement
  return { parentElement, button, setTriggerValue, cleanup }
}

describe('CopyButton (Streamlit Components v2)', () => {
  it('renders the material icon, label and tooltip from data', () => {
    const { button } = mount({ text: 'hello', tooltip: 'Copy me', copied_label: 'Done!' })

    expect(button.querySelector('.st-copy-icon')!.innerHTML).toContain('<svg')
    expect(button.querySelector('.st-copy-icon')!.innerHTML).toContain('viewBox="0 -960 960 960"')
    expect(button.querySelector('.st-copy-label')!.textContent).toBe('Done!')
    expect(button.getAttribute('title')).toBe('Copy me')
  })

  it('renders the streamlit icon when icon="st"', () => {
    const { button } = mount({ text: 'x', icon: 'st' })
    expect(button.querySelector('.st-copy-icon')!.innerHTML).toContain('<rect')
  })

  it('copies the text, reports the copied trigger, and toggles the copied class', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })

    const { button, setTriggerValue } = mount({ text: 'hello' })
    button.click()

    await vi.waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('hello')
      expect(setTriggerValue).toHaveBeenCalledWith('copied', true)
    })
    expect(button.classList.contains('button--copied')).toBe(true)
  })

  it('reports copied=false when the clipboard is unavailable and copy fails', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
    const execCommand = vi.fn().mockReturnValue(false)
    Object.defineProperty(document, 'execCommand', { value: execCommand, configurable: true })

    const { button, setTriggerValue } = mount({ text: 'nope' })
    button.click()

    await vi.waitFor(() => expect(setTriggerValue).toHaveBeenCalledWith('copied', false))
    expect(button.classList.contains('button--copied')).toBe(false)
  })

  it('cleanup removes the click listener', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })

    const { button, cleanup } = mount({ text: 'bye' })
    cleanup?.()
    button.click()

    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(writeText).not.toHaveBeenCalled()
  })
})
