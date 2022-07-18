import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';

const AllTheProviders: FC = ({ children }: any) => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <React.StrictMode>
          <Loading />
          <Toaster />
          {children}
        </React.StrictMode>
      </BrowserRouter>
    </RecoilRoot>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
