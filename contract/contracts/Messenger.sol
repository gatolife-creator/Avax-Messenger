// Messenger.sol
// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import "hardhat/console.sol";
import "./Ownable.sol";

contract Messenger is Ownable {
    uint256 public numOfPendingLimits;

    struct Message {
        address payable sender;
        address payable receiver;
        uint256 depositInWei;
        uint256 timestamp;
        string text;
        bool isPending;
    }

    mapping(address => Message[]) private messagesAtAddress;

    mapping(address => uint256) private numOfPendingAtAddress;

    event NewMessage(
        address sender,
        address receiver,
        uint256 depositInWei,
        uint256 timestamp,
        string text,
        bool isPending
    );

    event MessageConfirmed(address receiver, uint256 index);
    event NumOfPendingLimitsChanged(uint256 limits);

    constructor(uint256 _numOfPendingLimits) payable {
        console.log("Here is my first smart contract!");
        ownable();
        numOfPendingLimits = _numOfPendingLimits;
    }

    function changeNumOfPendingLimits(uint256 _limits) external onlyOwner {
        numOfPendingLimits = _limits;
        emit NumOfPendingLimitsChanged(numOfPendingLimits);
    }

    function post(
        string memory _text,
        address payable _receiver
    ) public payable {
        require(
            numOfPendingAtAddress[_receiver] < numOfPendingLimits,
            "The receiver has reached the number of pending limits"
        );

        numOfPendingAtAddress[_receiver] += 1;

        console.log(
            "%s posts text:[%s] token:[%d]",
            msg.sender,
            _text,
            msg.value
        );

        messagesAtAddress[_receiver].push(
            Message(
                payable(msg.sender),
                _receiver,
                msg.value,
                block.timestamp,
                _text,
                true
            )
        );

        emit NewMessage(
            msg.sender,
            _receiver,
            msg.value,
            block.timestamp,
            _text,
            true
        );
    }

    function accept(uint256 _index) public {
        confirmMessage(_index);
        Message memory message = messagesAtAddress[msg.sender][_index];
        sendAvax(message.receiver, message.depositInWei);

        emit MessageConfirmed(message.receiver, _index);
    }

    function deny(uint256 _index) public {
        confirmMessage(_index);
        Message memory message = messagesAtAddress[msg.sender][_index];
        sendAvax(message.sender, message.depositInWei);

        emit MessageConfirmed(message.receiver, _index);
    }

    function confirmMessage(uint256 _index) private {
        Message storage message = messagesAtAddress[msg.sender][_index];

        require(
            msg.sender == message.receiver,
            "Only the receiver can confirmMessage the message"
        );

        require(
            message.isPending == true,
            "This message has already been confirmed"
        );

        message.isPending = false;
    }

    function sendAvax(address payable _to, uint256 _amountInWei) private {
        (bool success, ) = (_to).call{value: _amountInWei}("");
        require(success, "Failed to withdraw AVAX from contract");
    }

    function getOwnMessages() public view returns (Message[] memory) {
        return messagesAtAddress[msg.sender];
    }
}
