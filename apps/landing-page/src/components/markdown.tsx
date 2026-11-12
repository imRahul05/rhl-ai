import * as React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components: Components = {
  h1: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-12 mb-4">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 mb-4 pt-8 border-t border-border first:mt-0 first:pt-0 first:border-t-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-sm text-muted-foreground leading-relaxed my-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-2 my-3 text-sm text-muted-foreground marker:text-primary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 space-y-2 my-3 text-sm text-muted-foreground marker:text-primary marker:font-mono">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-2 hover:opacity-80"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary/50 pl-4 my-4 italic">{children}</blockquote>
  ),
  hr: () => <hr className="my-8 border-border" />,
  pre: ({ children }) => (
    <pre className="my-4 p-4 rounded-lg border border-border bg-card font-mono text-xs leading-relaxed text-foreground overflow-x-auto">
      {children}
    </pre>
  ),
  code: ({ className, children }) =>
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="font-mono text-[0.85em] text-foreground bg-muted px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-xs text-left border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 font-mono font-semibold text-foreground bg-muted/50 border-b border-border">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 text-muted-foreground border-b border-border align-top">{children}</td>
  ),
};

export function Markdown({ children }: { children: string }): React.JSX.Element {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
