import React, { useEffect, useRef, useState } from 'react';
import { Button, Stack, Box, Text, IconButton, Image, Center, useColorMode, Skeleton } from '@chakra-ui/react';
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { SunIcon, MoonIcon, CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { getNFTData } from './util';

let interval: any | null = null;

function App(props: any) {
	const { colorMode, toggleColorMode } = useColorMode();

	let connectWithMetamask: any = useMetamask();
	let disconnectWithMetamask: any = useDisconnect();
	let address = useAddress();

	if (props.desktop) {
		address = props.address;

		connectWithMetamask = () => {};
		disconnectWithMetamask = () => {};
	}

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
		}, 5000);
	}
	
	return (
		<>
			<IconButton style={{marginTop: 10, marginLeft: 10}} aria-label="Toggle theme" colorScheme={colorMode == "light" ? "blue" : undefined} onClick={toggleColorMode} icon={colorMode == "light" ? (<MoonIcon />) : (<SunIcon />)} />
			{address ? (<IconButton style={{marginTop: 10, marginLeft: 10}} aria-label="Disconnect Wallet" colorScheme={colorMode == "light" ? "blue" : undefined} disabled={props.desktop} onClick={() => {disconnectWithMetamask();clearInterval(interval);setNFTData(null);interval = null;}} icon={<CloseIcon />} />) : null}
			{address && props.showAddressWarning ? (<IconButton style={{marginTop: 10, marginLeft: 10}} aria-label="Address was manually set" colorScheme={colorMode == "light" ? "blue" : undefined} disabled={true} onClick={() => {}} icon={<WarningIcon />} />) : null}
			<Center width="100%">
				{address && NFTData ? (
					<>
						<Stack direction="column">
							{NFTData.assets[index].is_nsfw ? (<Text fontSize="sm">NSFW, not displaying image</Text>) : (
								<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
									{NFTData.assets[index].image_url == null ? (<Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=" width="40vw" />) : (<Image src={NFTData.assets[index].image_url} width="40vw" alt={NFTData.assets[index].name} />)}
									{NFTData.assets[index].animation_url && NFTData.assets[index].animation_url.endsWith(".mp3") ? (<audio controls={false} loop={true} autoPlay={true} src={NFTData.assets[index].animation_url} />) : null}
								</Box>
							)}
							<Text style={{marginTop: 10}} fontSize="md">{NFTData.assets[index].name ?? "Unable to load this NFT."}</Text>
						</Stack>
					</>
				) : (
					<>
						<Button colorScheme={colorMode == "light" ? "blue" : undefined} disabled={props.desktop} onClick={() => {connectWithMetamask();setIndex(0);}}>Connect wallet</Button>
					</>
				)}
			</Center>
		</>
	);
}

export default App;
