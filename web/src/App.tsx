import React from 'react';
import { Button, IconButton, Center, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

function App() {
	const { colorMode, toggleColorMode } = useColorMode();
	
	return (
		<>
			<IconButton style={{marginTop: 10, marginLeft: 10}} aria-label="Toggle theme" colorScheme={colorMode == "light" ? "blue" : undefined} onClick={toggleColorMode} icon={colorMode == "light" ? (<MoonIcon />) : (<SunIcon />)} />
			<Center width="100%" height="100%">
				<Button>Hello, World!</Button>	
			</Center>
		</>
	);
}

export default App;
