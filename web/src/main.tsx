import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';

let config = {desktop: false, address: null};

if (location.hash.slice(1) != "") {
	try {
		config = JSON.parse(atob(location.hash.slice(1)));
	} catch (e) {}
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
