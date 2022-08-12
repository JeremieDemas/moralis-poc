// There is a 1% transaction fee on each swap.
// This fee is charged by Moralis, not 1inch.

// This plugin works with :
// - Ethereum(“eth”)
// - Binance Smart Chain(“bsc”)
// - Polygon(“polygon”)

// Testnets not supported

async function getSupportedTokens() {
    const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
    });
    console.log(tokens);
}

async function getQuote() {
    const quote = await Moralis.Plugins.oneInch.quote({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // The token you want to swap (USDT)
        toTokenAddress: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', // The token you want to receive (WETH)
        amount: '1',
    });
    console.log(quote);
}

async function hasAllowance() {
    const allowance = await Moralis.Plugins.oneInch.hasAllowance({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', // The token you want to swap (BNB)
        fromAddress: '0xde994bcb53f7C6E0CF021e8b5cd20065E817b776', // Your wallet address
        amount: '1',
    });
    console.log(`The user has enough allowance: ${allowance}`);
}

async function approve() {
    let user = Moralis.User.current();
    if (!user) {
        console.log("You need to login");
    } else {
        const result = await Moralis.Plugins.oneInch.approve({
            chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
            tokenAddress: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', // The token you want to swap (BNB)
            fromAddress: '0xde994bcb53f7C6E0CF021e8b5cd20065E817b776', // Your wallet address
        });
        console.log(result);
    }
}

async function swap() {
    let user = Moralis.User.current();
    if (!user) {
        console.log("You need to login");
    } else {
        const receipt = await Moralis.Plugins.oneInch.swap({
            chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
            fromTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // The token you want to swap (WETH)
            toTokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // The token you want to receive (USDT)
            amount: '1',
            fromAddress: '0xde994bcb53f7C6E0CF021e8b5cd20065E817b776', // Your wallet address
            slippage: 1,
        });
        console.log(receipt);
    }
}

document.getElementById("btn-getSupportedTokens").onclick = getSupportedTokens;
document.getElementById("btn-getQuote").onclick = getQuote;
document.getElementById("btn-hasAllowance").onclick = hasAllowance;
document.getElementById("btn-approve").onclick = approve;
document.getElementById("btn-swap").onclick = swap;