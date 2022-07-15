import React, { useEffect, useRef, useState } from 'react';
import { Button, Stack, Box, Text, IconButton, Image, Center, useColorMode } from '@chakra-ui/react';
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { SunIcon, MoonIcon, CloseIcon } from '@chakra-ui/icons';
import { getNFTData } from './util';

let interval: any | null = null;

function App() {
	const { colorMode, toggleColorMode } = useColorMode();

	const connectWithMetamask = useMetamask();
	const disconnectWithMetamask = useDisconnect();
	const address = useAddress();
	const [NFTData, setNFTData] = useState<any | null>(null);
	const [index, setIndex] = useState(0);
	const indexRef = useRef<any>();

	useEffect(() => {
		indexRef.current = index;
	}, [index]);

	if (address && NFTData == null) {
		(async () => {
			setNFTData(await getNFTData(address));
		})();
	}

	if (NFTData != null && !interval) {
		interval = setInterval(() => {
			console.log("updating...");
			setIndex(indexRef.current + 1 == NFTData.assets.length ? 0 : indexRef.current + 1);
		}, 1000);
	}
	
	return (
		<>
			<IconButton style={{marginTop: 10, marginLeft: 10}} aria-label="Toggle theme" colorScheme={colorMode == "light" ? "blue" : undefined} onClick={toggleColorMode} icon={colorMode == "light" ? (<MoonIcon />) : (<SunIcon />)} />
			{address ? (<IconButton style={{marginTop: 10, marginLeft: 10}} aria-label="Disconnect Wallet" colorScheme={colorMode == "light" ? "blue" : undefined} onClick={() => {disconnectWithMetamask();clearInterval(interval);setNFTData(null);interval = null;}} icon={<CloseIcon />} />) : null}
			<Center width="100%">
				{address && NFTData ? (
					<>
						<Stack direction="column">
							<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
								<Image src={NFTData.assets[index].image_url} width="40vw" alt={NFTData.assets[index].name} />
							</Box>
							<Text style={{marginTop: 10}} fontSize="md">{NFTData.assets[index].name}</Text>
						</Stack>
					</>
				) : (
					<>
						<Button colorScheme={colorMode == "light" ? "blue" : undefined} onClick={() => {connectWithMetamask();setIndex(0);}}>Connect wallet</Button>
					</>
				)}
			</Center>
		</>
	);
}

export default App;
