import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={extendTheme({config: {initialColorMode: "dark", useSystemColorMode: false}})}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
