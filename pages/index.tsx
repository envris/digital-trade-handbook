import { normalize } from 'path';
import { MDXRemote } from 'next-mdx-remote';
import { Prose } from '@ag.ds-next/prose';
import { InpageNav } from '@ag.ds-next/inpage-nav';
import { AppLayout } from '../components/AppLayout';
import { DocumentTitle } from '../components/DocumentTitle';
import { getMarkdownData, serializeMarkdown } from '../lib/mdxUtils';
import { getSidebarItems } from '../lib/content';
import { generateToc } from '../lib/generateToc';
import { mdxComponents } from '../components/mdxComponents';
import { PageLayout } from '../components/PageLayout';
import { PageTitle } from '../components/PageTitle';

type StaticProps = Awaited<ReturnType<typeof getStaticProps>>['props'];

export default function Homepage({
	sidebarItems,
	title,
	source,
	toc,
}: StaticProps) {
	return (
		<>
			<DocumentTitle title="Taking Farmers to Markets" />
			<AppLayout>
				<PageLayout
					editPath="/content/index.mdx"
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

export async function getStaticProps() {
	const { content, data } = await getMarkdownData(
		normalize(`${process.cwd()}/content/index.mdx`)
	);
	return {
		props: {
			sidebarItems: await getSidebarItems(),
			title: data.title as string,
			source: await serializeMarkdown(content),
			toc: generateToc(content),
		},
	};
}
