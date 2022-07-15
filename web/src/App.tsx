import React from 'react';
import { Button, IconButton, Center, useColorMode } from '@chakra-ui/react';
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function App() {
	const { colorMode, toggleColorMode } = useColorMode();

	const connectWithMetamask = useMetamask();
	const disconnectWithMetamask = useDisconnect();
	const address = useAddress();
	
	return (
		<>
			<IconButton style={{marginTop: 10, marginLeft: 10}} aria-label="Toggle theme" colorScheme={colorMode == "light" ? "blue" : undefined} onClick={toggleColorMode} icon={colorMode == "light" ? (<MoonIcon />) : (<SunIcon />)} />
			<Center width="100%">
				{address ? (
					<div>
						<p>{address}</p>
						<Button style={{marginTop: 10}} colorScheme={colorMode == "light" ? "blue" : undefined} onClick={disconnectWithMetamask}>Disconnect wallet</Button>
					</div>
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
