// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract TicketsList {

	enum TicketStatus {
		Open,
		Sold
	}

	struct Ticket {
		TicketStatus status;
		address owner;
		uint price;
	}

	mapping(uint => Ticket) private tickets;

	IERC721 public ticketContract;

	constructor(address _ticketContract) {
		ticketContract = IERC721(_ticketContract);

	}

	function sellTicket(address sender, uint tokenId, uint price) external {
		require(ticketContract.ownerOf(tokenId) == sender, "You can only sell your tickets :)");

		Ticket memory ticket = Ticket(
			TicketStatus.Open,
			sender,
			price
		);

		tickets[tokenId] = ticket;
	}


	function buyTicket(address sender, uint ticketId) external payable {
		Ticket memory ticket = tickets[ticketId];

		require(ticketContract.ownerOf(ticketId) == sender, "You cannot buy your own ticket :)");
		require(ticket.status == TicketStatus.Open, "You cannot buy a sold ticket");
		require(msg.value >= ticket.price, "Not enough payment");

		ticket.status = TicketStatus.Sold;

		ticketContract.transferFrom(address(this), sender, ticketId);
		payable(ticket.owner).transfer(ticket.price);
	}


	function refundTicket(address sender, uint ticketId) public {
		Ticket memory ticket = tickets[ticketId];

		require(ticketContract.ownerOf(ticketId) == sender, "Only the owner can refund");
		require(ticket.status == TicketStatus.Sold, "Ticket is not sold");

		ticket.status = TicketStatus.Open;
		ticketContract.transferFrom(sender, address(this), ticketId);
	}


	function getTicket(uint ticketId) public view returns (Ticket memory) {
		return tickets[ticketId];
	}
}