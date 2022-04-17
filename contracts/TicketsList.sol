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
		address token;
		uint tokenId;
		uint price;
	}

	uint private currentTicketId = 0;
	mapping(uint => Ticket) private tickets;

	function addTicket(address token, uint tokenId, uint price) external {
		IERC721(token).transferFrom(msg.sender, address(this), tokenId);

		Ticket memory ticket = Ticket(
			TicketStatus.Open,
			msg.sender,
			token,
			tokenId,
			price
		);

		currentTicketId++;
		tickets[currentTicketId] = ticket;
	}


	function buyTicket(uint ticketId) external payable {
		Ticket storage ticket = tickets[ticketId];

		require(msg.sender != ticket.owner, "You cannot buy your own ticket :)");
		require(ticket.status == TicketStatus.Open, "You cannot buy a sold ticket");
		require(msg.value >= ticket.price, "Not enough payment");

		ticket.status = TicketStatus.Sold;

		IERC721(ticket.token).transferFrom(address(this), msg.sender, ticket.tokenId);
		payable(ticket.owner).transfer(ticket.price);
	}


	function refundTicket(uint ticketId) public {
		Ticket storage ticket = tickets[ticketId];

		require(msg.sender == ticket.owner, "Only the owner can refund");
		require(ticket.status == TicketStatus.Sold, "Ticket is not sold");

		ticket.status = TicketStatus.Open;
		IERC721(ticket.token).transferFrom(msg.sender, address(this), ticket.tokenId);
	}


	function getTicket(uint ticketId) public view returns (Ticket memory) {
		return tickets[ticketId];
	}
}