import React, { useState } from 'react';
import { Button, Stack, Box, Text, IconButton, Image, Center, useColorMode } from '@chakra-ui/react';
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { SunIcon, MoonIcon, CloseIcon } from '@chakra-ui/icons';
import { getNFTData } from './util';

function App() {
	const { colorMode, toggleColorMode } = useColorMode();

	const connectWithMetamask = useMetamask();
	const disconnectWithMetamask = useDisconnect();
	const address = useAddress();
	const [data, setData] = useState<any | null>(null);

	if (address && data == null) {
		(async () => {
			let nftData = await getNFTData(address);

			updateImage(nftData.assets[0]);
		})();
	}

	function updateImage(asset: any) {
		setData(
			<Stack direction="column">
				<Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
					<Image src={asset.image_url} width="40vw" alt={asset.name} />
				</Box>
				<Text style={{marginTop: 10}} fontSize="md">{asset.name}</Text>
			</Stack>
		);
	}
	
	return (
		<>
			<IconButton style={{marginTop: 10, marginLeft: 10}} aria-label="Toggle theme" colorScheme={colorMode == "light" ? "blue" : undefined} onClick={toggleColorMode} icon={colorMode == "light" ? (<MoonIcon />) : (<SunIcon />)} />
			{address ? (<IconButton style={{marginTop: 10, marginLeft: 10}} aria-label="Disconnect Wallet" colorScheme={colorMode == "light" ? "blue" : undefined} onClick={disconnectWithMetamask} icon={<CloseIcon />} />) : null}
			<Center width="100%">
				{address ? (
					<>
						{data}
					</>
				) : (
					<>
						<Button colorScheme={colorMode == "light" ? "blue" : undefined} onClick={connectWithMetamask}>Connect wallet</Button>
					</>
				)}
			</Center>
		</>
	);
}

export default App;
