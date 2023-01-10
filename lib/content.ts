import { normalize } from 'path';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { getMarkdownData } from './mdxUtils';
import { stripMdxExtension } from './mdxUtils';
import { slugify } from './slugify';

export const CONTENT_PATH = normalize(`${process.cwd()}/content/`);

type SidebarItem = {
	label: string;
	href: string;
	items?: SidebarItem[];
};

export async function getSidebarItems() {
	return await getFolderData(CONTENT_PATH);
}

async function getFolderData(path: string): Promise<SidebarItem[]> {
	const entries = await readdir(path, { withFileTypes: true });

	const items = await Promise.all(
		entries.map(async (file) => {
			if (file.name === 'index.mdx') return null;
			const href = getHref(path, file.name);
			if (file.isDirectory()) {
				const { data } = await getMarkdownData(
					normalize(`${path}/${file.name}/index.mdx`)
				);
				return {
					href: href,
					label: data.title as string,
					items: await getFolderData(`${path}/${file.name}`),
				};
			}
			const { data } = await getMarkdownData(normalize(`${path}/${file.name}`));
			return {
				label: data.title as string,
				href,
			};
		})
	);

	return items.filter((x): x is NonNullable<typeof x> => Boolean(x));
}

export async function getContentMarkdownData(slug: string[]) {
	const firstPath = normalize(`${CONTENT_PATH}/${slug.join('/')}.mdx`);
	if (existsSync(firstPath)) {
		return await getMarkdownData(
			normalize(`${CONTENT_PATH}/${slug.join('/')}.mdx`)
		);
	}
	const secondPath = normalize(`${CONTENT_PATH}/${slug.join('/')}/index.mdx`);
	return getMarkdownData(normalize(secondPath));
}

export async function getContentPaths() {
	const items = await getFolderHrefs(CONTENT_PATH);
	return items.map(flattenFolderItems).flat(99).filter(Boolean) as string[];
}

async function getFolderHrefs(path: string) {
	const entries = await readdir(path, { withFileTypes: true });
	const items = await Promise.all(
		entries.map(async (file) => {
			const href = getHref(path, file.name);
			if (file.isDirectory()) {
				return {
					href,
					items: await getFolderData(`${path}/${file.name}`),
				};
			}
			return { href };
		})
	);
	return items;
}

function flattenFolderItems(item: {
	href: string;
	items?: { href: string }[];
}): string | unknown[] {
	if (Array.isArray(item.items)) {
		return [...item.items.map(flattenFolderItems), item.href];
	}
	return item.href;
}

function getHref(path: string, fileName: string) {
	return `${path.replace(CONTENT_PATH, '')}/${slugify(
		stripMdxExtension(normalize(fileName))
	)}`.replace('/index', '');
}

export async function getEditPath(slug: string[]) {
	if (existsSync(`${CONTENT_PATH}/${slug.join('/')}.mdx`)) {
		return `/content/${slug.join('/')}.mdx`;
	}
	return `/content/${slug.join('/')}/index.mdx`;
}
