import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { Prose } from '@ag.ds-next/react/prose';
import { InpageNav } from '@ag.ds-next/react/inpage-nav';
import { AppLayout } from '../components/AppLayout';
import { DocumentTitle } from '../components/DocumentTitle';
import { serializeMarkdown } from '../lib/mdxUtils';
import { mdxComponents } from '../components/mdxComponents';
import { PageLayout } from '../components/PageLayout';
import {
	getSidebarItems,
	getContentPaths,
	getContentMarkdownData,
	getEditPath,
} from '../lib/content';
import { PageTitle } from '../components/PageTitle';
import { generateToc } from '../lib/generateToc';

type StaticProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page({
	editPath,
	pageTitle,
	sidebarItems,
	source,
	title,
	toc,
}: StaticProps) {
	return (
		<>
			<DocumentTitle title={pageTitle} />
			<AppLayout>
				<PageLayout
					editPath={editPath}
					sideNav={{
						title: 'Home',
						titleLink: '/',
						items: sidebarItems,
					}}
				>
					<PageTitle title={title} />
					{toc.length > 1 ? (
						<InpageNav
							title="On this page"
							links={toc.map(({ slug, title }) => ({
								href: `#${slug}`,
								label: title,
							}))}
						/>
					) : null}
					<Prose>
						<MDXRemote {...source} components={mdxComponents} />
					</Prose>
				</PageLayout>
			</AppLayout>
		</>
	);
}

export const getStaticProps: GetStaticProps<
	{
		editPath: Awaited<ReturnType<typeof getEditPath>>;
		pageTitle: string;
		sidebarItems: Awaited<ReturnType<typeof getSidebarItems>>;
		source: Awaited<ReturnType<typeof serializeMarkdown>>;
		title: string;
		toc: ReturnType<typeof generateToc>;
	},
	{ slug: string }
> = async ({ params }) => {
	const { slug } = params ?? {};

	if (!Array.isArray(slug)) {
		return { notFound: true };
	}

	const { content, data } = await getContentMarkdownData(slug);
	return {
		props: {
			editPath: await getEditPath(slug),
			pageTitle: data.title as string,
			sidebarItems: await getSidebarItems(),
			source: await serializeMarkdown(content),
			title: data.title as string,
			toc: generateToc(content),
		},
	};
};

export async function getStaticPaths() {
	const paths = await getContentPaths();
	return {
		paths,
		fallback: false,
	};
}
