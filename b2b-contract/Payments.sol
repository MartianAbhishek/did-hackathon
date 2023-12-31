// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Payments {
    /**
     * Public counter variable
     */
    uint public counter;

    /**
     * Use an interval in seconds and a timestamp to slow execution of Upkeep
     */
    address[] public sendersAddress;

    struct TransferRequest {
        address payable recipient;
        uint256 releaseTimestamp;
        uint256 amount;
        bool executed;
    }

    uint256 public requestCount;
    mapping(address => TransferRequest[]) public senderToTransferRequests;


    function performUpkeep() public  {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        TransferRequest[] memory transfersToBeExecuted;
        for(uint256 i = 0; i < sendersAddress.length; i++ ){
            address sender = sendersAddress[i];
            for(uint256 j = 0; j < senderToTransferRequests[sender].length; j ++ ){
                if(!senderToTransferRequests[sender][j].executed && senderToTransferRequests[sender][j].releaseTimestamp <= block.timestamp){
                    executeTransfer(sender, j);
                }
            }
        }
        // We don't use the performData in this example. The performData is generated by the Automation Node's call to your checkUpkeep function
    }

    // Create a request for a delayed Ether transfer
    function createTransferRequest(address payable recipient, uint256 releaseTimestamp) public payable {
        require(msg.value > 0, "Must send some Ether");
        // require(releaseTimestamp > block.timestamp, "Release time must be in the future");
        
        senderToTransferRequests[msg.sender].push(TransferRequest({
            recipient: recipient,
            releaseTimestamp: releaseTimestamp + block.timestamp,
            amount: msg.value,
            executed: false
        }));
        sendersAddress.push(msg.sender);
    }

    // Execute a transfer request
    function executeTransfer(address sender, uint256 requestId) private {
        require(requestId < senderToTransferRequests[sender].length, "requestId is bigger than the length of the array");
        TransferRequest storage request = senderToTransferRequests[sender][requestId];
        require(!request.executed, "Request already executed");
        require(block.timestamp >= request.releaseTimestamp, "Release time not reached");
        
        request.executed = true;
        request.recipient.transfer(request.amount);
    }

    // Cancel a transfer request initiated by the sender
    function cancelTransfer(uint256 requestId) public {
        TransferRequest storage request = senderToTransferRequests[msg.sender][requestId];
        require(!request.executed, "Request already executed");

        // Refund the sender's Ether
        payable(msg.sender).transfer(request.amount);
        request.executed = true;
    }

    fallback() external payable { }
    receive() external payable { }
}
