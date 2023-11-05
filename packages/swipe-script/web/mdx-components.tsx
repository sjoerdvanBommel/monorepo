import { CounterButton } from '@/components/mdx/counter-button'
import { InlineQuestion } from '@/components/mdx/inline-question'
import 'highlight.js/styles/vs2015.css'
import type { MDXComponents } from 'mdx/types'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mb-2 text-lg tracking-wider">{children}</h1>
  ),
  a: ({ children, ...props }) => (
    <a {...props} className="underline">
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="list-inside">
      {children}
    </ul>
  ),
  strong: ({ children }) => (
    <strong className="tracking-wide">{children}</strong>
  ),
  pre: ({ children }) => (
    <pre className="rounded-lg overflow-hidden">{children}</pre>
  ),
  img: ({ children, ...attrs }) => (
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    <img className={`rounded-lg overflow-hidden ${attrs.className}`} {...attrs}>
      {children}
    </img>
  ),
  CounterButton,
  InlineQuestion,
}

export function useMDXComponents(
  componentsOverride: MDXComponents,
): MDXComponents {
  return { components, ...componentsOverride }
}

export function MDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      // @ts-ignore -- Version mismatch, but seems to work fine
      options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
