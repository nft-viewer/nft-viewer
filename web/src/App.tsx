import React from 'react';
import { IconButton, Center, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

function App() {
	const { colorMode, toggleColorMode } = useColorMode();
	
	return (
		<Center width="100vw" height="100vh">
			<IconButton aria-label="Toggle theme" colorScheme={colorMode == "light" ? "blue" : undefined} onClick={toggleColorMode} icon={colorMode == "light" ? (<MoonIcon />) : (<SunIcon />)} />
		</Center>
	);
}

export default App;
