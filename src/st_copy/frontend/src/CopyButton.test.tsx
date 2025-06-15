import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { vi } from 'vitest'
import type { ComponentType } from 'react'
import CopyButton from './CopyButton'

vi.mock('streamlit-component-lib', () => ({
  Streamlit: { setFrameHeight: vi.fn(), setComponentValue: vi.fn() },
  withStreamlitConnection:
    <P extends object>(c: ComponentType<P>): ComponentType<P> => c,
}))

vi.stubGlobal('ResizeObserver', class { observe(){} disconnect(){} })

describe('CopyButton', () => {
  it('copies text and shows label', async () => {
    const writeMock = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText: writeMock } })

    render(<CopyButton args={{ text: 'hello' }} theme={{}} />)

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(writeMock).toHaveBeenCalledWith('hello'))
    await waitFor(() => expect(screen.getByText('Copied!')).toBeVisible())
  })
})
