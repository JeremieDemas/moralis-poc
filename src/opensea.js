// This plugin works with :
// - Ethereum Mainnet (‘mainnet’)
// - Ethereum Rinkeby(‘testnet’)

async function getAsset() {
    const asset = await Moralis.Plugins.opensea.getAsset({
        network: 'testnet',
        tokenAddress: '0xDCA3Cfc7439d6b5a50E996da8D068E04A05A484a',
        tokenId: '1',
    });
    console.log(asset);
}

/////////////////////////////////////////////////////////
// The following functions do not work //////////////////
// Option 1 - Waiting for Moralis Update/Documentation //
// Option 2 - Pass directly through Opensea API /////////
/////////////////////////////////////////////////////////

async function getOrders() {
    const orders = await Moralis.Plugins.opensea.getOrders({
        network: 'testnet',
        tokenAddress: '0x4d529E6A405643ddfd8Df7c0778f1B750fBBb7fE',
        tokenId: '1',
        orderSide: 1, // 0 for buyOrders and 1 for sellOrders
        page: 1, // pagination shows 20 orders each page
    });
    console.log(orders);
}

async function createSellOrder() {
    let user = Moralis.User.current();
    if (!user) {
        console.log("You need to login");
    } else {
        const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24); // Expire this auction one day from now (conversion from JS timestamp in milliseconds)

        const result = await Moralis.Plugins.opensea.createSellOrder({
            network: 'testnet',
            tokenAddress: '0x4d529E6A405643ddfd8Df7c0778f1B750fBBb7fE',
            tokenId: '1',
            tokenType: 'ERC721',
            userAddress: '0xde994bcb53f7C6E0CF021e8b5cd20065E817b776',
            startAmount: 100000000000000000,
            endAmount: 100000000000000000,
            // expirationTime: expirationTime, Only set if you startAmount > endAmount
        });
        console.log(result);
    }
}

async function createBuyOrder() {
    await Moralis.Plugins.opensea.createBuyOrder({
        network: 'testnet',
        tokenAddress: '0xdbe8143c3996c87ecd639ebba5d13b84f56855c2',
        tokenId: '0',
        tokenType: 'ERC1155',
        amount: 0.5,
        userAddress: '0x6057b9bA4BAe35B8128685f342a8e1016b77046d',
        paymentTokenAddress: '0xc778417e063141139fce010982780140aa0cd5ab',
    });
}

async function fullfillOrder() {
    await Moralis.Plugins.opensea.fulfillOrder({
        network: 'testnet',
        userAddress: '0x6057b9bA4BAe35B8128685f342a8e1016b77046d',
        order: {},
    });
}

async function cancelOrder() {
    await Moralis.Plugins.opensea.cancelOrder({
        network: 'testnet',
        userAddress: '0x6057b9bA4BAe35B8128685f342a8e1016b77046d',
        order: {},
    });
}

document.getElementById("btn-getAsset").onclick = getAsset;
document.getElementById("btn-getOrders").onclick = getOrders;
document.getElementById("btn-createSellOrder").onclick = createSellOrder;
document.getElementById("btn-createBuyOrder").onclick = createBuyOrder;
document.getElementById("btn-fullfillOrder").onclick = fullfillOrder;
document.getElementById("btn-cancelOrder").onclick = cancelOrder;