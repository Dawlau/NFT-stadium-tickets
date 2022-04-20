const { num_max_tickets, nftAddresses } = require("./constants")
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const ticketContractAbi = require("../artifacts/contracts/Ticket.sol/Ticket.json").abi
const ticketsListContractAbi = require("../artifacts/contracts/TicketsList.sol/TicketsList.json").abi

const ticketContractAddress = process.env.TICKET_CONTRACT_ADDRESS
const ticketsListContractAddress = process.env.TICKETSLIST_CONTRACT_ADDRESS

const ticketContract = new web3.eth.Contract(ticketContractAbi, ticketContractAddress)
const ticketsListContract = new web3.eth.Contract(ticketsListContractAbi, ticketsListContractAddress)

async function mintTicket() {
	try {
		const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

		const transaction = {
			'from': PUBLIC_KEY,
			'to': ticketContractAddress,
			'nonce': nonce,
			'gas': 500000,
			'data': ticketContract.methods.mint(PUBLIC_KEY).encodeABI()
		};

		const signedTransaction = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

		const receipt = await web3.eth.sendSignedTransaction(
			signedTransaction.rawTransaction,
			function(err, hash) {
				if (err) {
					console.log("Something went wrong when submitting your transaction:", err)
				} else {
					console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!")
				}
			}
		)

	} catch(err) {
		console.error(err)
	}
}

const mintTickets = async () => {
	for (var i = 1; i <= num_max_tickets; i++) {
		await mintTicket();
	}
}

// mintTickets();



async function sellTicket(i) {

	// to do approve transaction
	// sell ticket
	// address = nftAddresses[i - 1]

	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

	const transaction = {
		'from': PUBLIC_KEY,
		'to': ticketsListContractAddress,
		'nonce': nonce,
		'gas': 500000,
		'data': ticketsListContract.methods.sellTicket(PUBLIC_KEY, i, 1).encodeABI()
	};

	const signedTransaction = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

	const receipt = await web3.eth.sendSignedTransaction(
		signedTransaction.rawTransaction,
		function(err, hash) {
			if (err) {
				console.log("Something went wrong when submitting your transaction:", err)
			} else {
				console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!")
			}
		}
	)

}

const sellTickets = async () => {
	for (var i = 1; i <= num_max_tickets; i++) {
		await sellTicket(i + 1);
	}
}

// sellTickets();

const buyTicket = async (i) => {
	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

	const transaction = {
		'from': PUBLIC_KEY,
		'to': ticketsListContractAddress,
		'nonce': nonce,
		'gas': 500000,
		'data': ticketsListContract.methods.buyTicket(PUBLIC_KEY, i).encodeABI()
	};

	const signedTransaction = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

	const receipt = await web3.eth.sendSignedTransaction(
		signedTransaction.rawTransaction,
		function(err, hash) {
			if (err) {
				console.log("Something went wrong when submitting your transaction:", err)
			} else {
				console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!")
			}
		}
	)
}

const refundTicket = async (i) => {
	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

	const transaction = {
		'from': PUBLIC_KEY,
		'to': ticketsListContractAddress,
		'nonce': nonce,
		'gas': 500000,
		'data': ticketsListContract.methods.refundTicket(PUBLIC_KEY, i).encodeABI()
	};

	const signedTransaction = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

	const receipt = await web3.eth.sendSignedTransaction(
		signedTransaction.rawTransaction,
		function(err, hash) {
			if (err) {
				console.log("Something went wrong when submitting your transaction:", err)
			} else {
				console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!")
			}
		}
	)
}
