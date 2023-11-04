import type { MDXComponents } from 'mdx/types'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'

const components: MDXComponents = {
  h1: ({ children }) => <h1 className="mb-2">{children}</h1>,
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
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
