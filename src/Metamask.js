

export function hasMetaMask() {
    const { ethereum } = window;
    return ethereum && ethereum.isMetaMask;
}

export async function connectToMetaMask() {
    const { ethereum } = window;
    if(!ethereum) {
        return false;
    }
    try {
        await ethereum.request({ method: 'eth_requestAccounts' })
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function getConnectedAccount() {
    const { ethereum } = window;

    let accounts = await ethereum.request({ method: 'eth_accounts' })
    return accounts[0] || null;
}