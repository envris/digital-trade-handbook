import { TextLink } from '@ag.ds-next/text-link';

const ORG = 'envris';
const REPO = 'digital-trade-handbook';
const BRANCH = 'main';

export function EditPage({ path = '' }) {
	return (
		<TextLink href={`https://github.com/${ORG}/${REPO}/edit/${BRANCH}${path}`}>
			Edit this page
		</TextLink>
	);
}
