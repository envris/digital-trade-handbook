import { normalize } from 'path';
import { getMarkdownData, serializeMarkdown } from '../lib/mdxUtils';
import { getEditPath, getSidebarItems } from '../lib/content';
import { generateToc } from '../lib/generateToc';
import Page from './[...slug]';

export default Page;

export async function getStaticProps() {
	const { content, data } = await getMarkdownData(
		normalize(`${process.cwd()}/content/index.mdx`)
	);
	return {
		props: {
			editPath: await getEditPath(['index']),
			sidebarItems: await getSidebarItems(),
			source: await serializeMarkdown(content),
			pageTitle: null,
			title: data.title as string,
			toc: generateToc(content),
		},
	};
}
