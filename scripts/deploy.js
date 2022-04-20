async function main() {
	const Ticket = await ethers.getContractFactory("Ticket")
	const ticket = await Ticket.deploy()
	await ticket.deployed()
	// const TicketList = await ethers.getContractFactory("TicketsList")
	// const ticketList = await TicketList.deploy(ticket.address)
	// await ticketList.deployed()
	console.log("Contract deployed to address:", ticket.address)
	// console.log("Contract deployed to address:", ticketList.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })