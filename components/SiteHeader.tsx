import { Logo } from '@ag.ds-next/react/ag-branding';
import { Stack } from '@ag.ds-next/react/box';
import { Header } from '@ag.ds-next/react/header';
import { MainNavBottomBar } from '@ag.ds-next/react/main-nav';

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
