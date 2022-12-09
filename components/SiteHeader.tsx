import { Logo } from '@ag.ds-next/ag-branding';
import { Stack } from '@ag.ds-next/box';
import { Header } from '@ag.ds-next/header';
import { MainNavBottomBar } from '@ag.ds-next/main-nav';

export const SiteHeader = () => {
	return (
		<Stack palette="dark">
			<Header
				background="bodyAlt"
				logo={<Logo />}
				heading="Taking Farmers to Markets "
				subline="Service Delivery Handbook"
			/>
			<MainNavBottomBar />
		</Stack>
	);
};
