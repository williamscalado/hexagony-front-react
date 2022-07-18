import { render, screen } from '../../test-utils'
import { Footer } from '.'

it('renders open source software message', () => {
  render(<Footer />)
  expect(screen.getByText('Open Source Software')).toBeInTheDocument()
})
