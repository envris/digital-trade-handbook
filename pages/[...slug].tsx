import { MDXRemote } from 'next-mdx-remote';
import { Prose } from '@ag.ds-next/prose';
import { InpageNav } from '@ag.ds-next/inpage-nav';
import { AppLayout } from '../components/AppLayout';
import { DocumentTitle } from '../components/DocumentTitle';
import { getMarkdownData, serializeMarkdown } from '../lib/mdxUtils';
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

type StaticProps = Awaited<ReturnType<typeof getStaticProps>>['props'];

export default function ContentPage({
	sidebarItems,
	source,
	title,
	toc,
	editPath,
}: StaticProps) {
	return (
		<>
			<DocumentTitle />
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

export async function getStaticProps(ctx) {
	const slug = ctx.params.slug;
	const { content, data } = await getContentMarkdownData(slug);
	return {
		props: {
			sidebarItems: await getSidebarItems(),
			editPath: await getEditPath(slug),
			title: data.title as string,
			source: await serializeMarkdown(content),
			toc: generateToc(content),
		},
	};
}

export async function getStaticPaths() {
	const paths = await getContentPaths();
	return {
		paths,
		fallback: false,
	};
}
