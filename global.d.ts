declare module 'react-ipynb-renderer' {
  import { ComponentType } from 'react';
  import { Notebook } from 'ipynb';

  export interface RendererProps {
    ipynb: Notebook;
  }

  export const IpynbRenderer: ComponentType<RendererProps>;
}
