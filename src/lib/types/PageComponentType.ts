import { ReactElement } from 'react';

/** React-Router page component with an optional static path. */
export type PageComponentType = React.FC & {
  (): ReactElement;
  path?: string;
};
