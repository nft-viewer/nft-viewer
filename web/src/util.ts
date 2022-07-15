async function getNFTData(address: string) {
	console.log(`Getting NFT Data for ${address}...`);

	let data = localStorage.getItem(address);

	if (data != null && JSON.parse(data).expire > Date.now()) {
		return JSON.parse(data);
	}

	return refreshNFTData(address);
}

async function refreshNFTData(address: string) {
	const response = await fetch(`https://api.opensea.io/api/v1/assets?format=json&owner=${address}`);
	let data = await response.json();

	let expire = new Date();
	expire.setHours(expire.getHours() + 1);
	data.expire = expire.getTime();

	localStorage.setItem(address, JSON.stringify(data));

	return data;
}

export {
	getNFTData,
	refreshNFTData
};