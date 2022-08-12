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
    let user = Moralis.User.current();
    if (!user) {
        console.log("There is no user connected");
    } else {
        await Moralis.User.logOut();
        console.log("logged out");
    }
}

document.getElementById("btn-loginM").onclick = loginWithMetamask;
document.getElementById("btn-loginWC").onclick = loginWithWalletConnect;
document.getElementById("btn-logout").onclick = logOut;