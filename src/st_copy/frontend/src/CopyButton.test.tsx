import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import CopyButton from './CopyButton'

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
