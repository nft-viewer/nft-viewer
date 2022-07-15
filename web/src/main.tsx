import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThirdwebProvider desiredChainId={ChainId.Mainnet}>
			<ChakraProvider theme={extendTheme({config: {initialColorMode: "dark", useSystemColorMode: false}})}>
				<App />
			</ChakraProvider>
		</ThirdwebProvider>
	</React.StrictMode>
);
