import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

const AllTheProviders: FC = ({ children }: any) => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Toaster />
        {children}
      </React.StrictMode>
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }