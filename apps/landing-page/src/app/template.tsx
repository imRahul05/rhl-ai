import * as React from 'react';

export interface TemplateProps {
  children: React.ReactNode;
}

/** Remounts on every navigation, replaying a short CSS enter transition. */
export default function Template({ children }: TemplateProps): React.JSX.Element {
  return <div className="page-enter flex flex-1 flex-col">{children}</div>;
}
