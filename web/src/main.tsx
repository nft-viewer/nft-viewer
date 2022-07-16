import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';

declare var window: any

(async () => {
	let config = {desktop: false, address: null};

	if (typeof window.desktopAPI != "undefined") {
		config = await window.desktopAPI.getConfig();
	}
	
	console.log(config);
	
	ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
		<React.StrictMode>
			<ThirdwebProvider desiredChainId={ChainId.Mainnet}>
				<ChakraProvider theme={extendTheme({config: {initialColorMode: "dark", useSystemColorMode: false}})}>
					<App desktop={config.desktop} address={config.address} showAddressWarning={!!config.desktop} />
				</ChakraProvider>
			</ThirdwebProvider>
		</React.StrictMode>
	);
})();
