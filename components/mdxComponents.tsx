import { Fragment, HTMLAttributes, AnchorHTMLAttributes } from 'react';
import type { MDXRemoteProps } from 'next-mdx-remote';
import Link from 'next/link';
import { proseBlockClassname } from '@ag.ds-next/react/prose';
import { PageAlert, PageAlertProps } from '@ag.ds-next/react/page-alert';
import { slugify } from '../lib/slugify';

export const mdxComponents: MDXRemoteProps['components'] = {
	Fragment,
	a: ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
		if (!href) return <a {...props} />;
		return <Link href={href} {...props} />;
	},
	// Automatically assign an ID to h2 and h3 elements so they can be linked to
	h2: ({ children }: HTMLAttributes<HTMLHeadingElement>) => {
		return (
			<h2 id={children ? slugify(children.toString()) : undefined}>
				{children}
			</h2>
		);
	},
	h3: ({ children }: HTMLAttributes<HTMLHeadingElement>) => {
		return (
			<h3 id={children ? slugify(children.toString()) : undefined}>
				{children}
			</h3>
		);
	},
	PageAlert: (props: PageAlertProps) => (
		<div className={proseBlockClassname}>
			<PageAlert {...props} />
		</div>
	),
};
