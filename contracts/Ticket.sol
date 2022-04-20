// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract Ticket is ERC721 {

	constructor() ERC721("Ticket", "Ticket") {}

	uint private tokenId = 0;

	function mint(address recipient) external returns (uint) {
		tokenId++;
		_mint(recipient, tokenId);

		return tokenId;
	}
}