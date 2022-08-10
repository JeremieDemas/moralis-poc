const serverUrl = "https://wlwsana6qyn5.usemoralis.com:2053/server";
const appId = "w61uB08W3CeHPhifebnIUELjqmepXXa9UUKNBazP";

Moralis.start({ serverUrl, appId });

////////////////////
// AUTHENTICATION //
////////////////////

async function loginWithMetamask() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate();
    }
    console.log("logged in user:", user);
}

async function loginWithWalletConnect() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({ provider: "walletconnect" });
    }
    console.log("logged in user:", user);
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

document.getElementById("btn-loginM").onclick = loginWithMetamask;
document.getElementById("btn-loginWC").onclick = loginWithWalletConnect;
document.getElementById("btn-logout").onclick = logOut;

//////////////////
// 1INCH PLUGIN //
//////////////////

// There is a 1% transaction fee on each swap.
// This fee is charged by Moralis, not 1inch.

// This plugin works with :
// - Ethereum(“eth”)
// - Binance Smart Chain(“bsc”)
// - Polygon(“polygon”)

async function getSupportedTokens() {
    const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
    });
    console.log(tokens);
}

async function getQuote() {
    const quote = await Moralis.Plugins.oneInch.quote({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: '0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4', // The token you want to swap
        toTokenAddress: '0x6fd7c98458a943f469e1cf4ea85b173f5cd342f4', // The token you want to receive
        amount: '1000',
    });
    console.log(quote);
}

async function hasAllowance() {
    const allowance = await Moralis.Plugins.oneInch.hasAllowance({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: '0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4', // The token you want to swap
        fromAddress: '0x6217e65d864d77DEcbFF0CFeFA13A93f7C1dD064', // Your wallet address
        amount: '1000',
    });
    console.log(`The user has enough allowance: ${allowance}`);
}

async function approve() {
    await Moralis.Plugins.oneInch.approve({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        tokenAddress: '0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4', // The token you want to swap
        fromAddress: '0x6217e65d864d77DEcbFF0CFeFA13A93f7C1dD064', // Your wallet address
    });
}

async function swap() {
    const receipt = await Moralis.Plugins.oneInch.swap({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: '0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4', // The token you want to swap
        toTokenAddress: '0x6fd7c98458a943f469e1cf4ea85b173f5cd342f4', // The token you want to receive
        amount: '1000',
        fromAddress: '0x6217e65d864d77DEcbFF0CFeFA13A93f7C1dD064', // Your wallet address
        slippage: 1,
    });
    console.log(receipt);
}

document.getElementById("btn-getSupportedTokens").onclick = getSupportedTokens;
// document.getElementById("btn-getQuote").onclick = getQuote;
// document.getElementById("btn-hasAllowance").onclick = hasAllowance;
// document.getElementById("btn-approve").onclick = approve;
// document.getElementById("btn-swap").onclick = swap;

////////////////////
// OPENSEA PLUGIN //
////////////////////

// This plugin works with :
// - Ethereum Mainnet (‘mainnet’)
// - Ethereum Rinkeby(‘testnet’)

async function getAsset() {
    await Moralis.Plugins.opensea.getAsset({
        network: 'testnet',
        tokenAddress: '0xDCA3Cfc7439d6b5a50E996da8D068E04A05A484a',
        tokenId: '1',
    });
}

async function getOrders() {
    await Moralis.Plugins.opensea.getOrders({
        network: network,
        tokenAddress: tokenAddress,
        tokenId: tokenId,
        orderSide: side,
        page: 1, // pagination shows 20 orders each page
    });
}

async function createSellOrder() {
    // Expire this auction one day from now.
    // Note that we convert from the JavaScript timestamp (milliseconds):

    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);

    await Moralis.Plugins.opensea.createSellOrder({
        network: 'testnet',
        tokenAddress: '0xdbe8143c3996c87ecd639ebba5d13b84f56855c2',
        tokenId: '0',
        tokenType: 'ERC1155',
        userAddress: '0x7fB3948c368A943e4EFE848F251E4f254dA1a2b2',
        startAmount: 1,
        endAmount: 1,
        // expirationTime: expirationTime, Only set if you startAmount > endAmount
    });
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
// document.getElementById("btn-getOrders").onclick = getOrders;
// document.getElementById("btn-createSellOrder").onclick = createSellOrder;
// document.getElementById("btn-createBuyOrder").onclick = createBuyOrder;
// document.getElementById("btn-fullfillOrder").onclick = fullfillOrder;
// document.getElementById("btn-cancelOrder").onclick = cancelOrder;