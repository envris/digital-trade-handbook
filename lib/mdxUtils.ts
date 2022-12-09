import { readFile } from 'fs/promises';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

export function stripMdxExtension(filename: string) {
	return filename.replace(/\.mdx?$/gi, '');
}

export async function getMarkdownData(filePath: string) {
	const fileContents = await readFile(filePath, { encoding: 'utf8' });
	return matter(fileContents);
}

export async function getJSONData(filePath: string) {
	const fileContents = await readFile(filePath, { encoding: 'utf8' });
	return JSON.parse(fileContents);
}

export function serializeMarkdown(
	source: string,
	scope?: Record<string, unknown>
) {
	return serialize(source, {
		mdxOptions: {
			remarkPlugins: [],
			rehypePlugins: [],
		},
		scope,
	});
}
