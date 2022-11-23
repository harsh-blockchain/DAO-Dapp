// SPDX-License-Identifier: MIT

pragma solidity >=0.4.0 <0.9.0;

contract daoContract{

    //proposal

    struct Proposal{
        uint256 id;
        string name;
        string description;
        bool isAccepted;
        address applicant;
        address[] allVoters;

        uint fors;
        uint against;
        uint notClear;
    }

    address public chairperson;
    Proposal[] proposals;



    

    function createProposal(string memory _name,string memory _description) external{

        uint _id = proposals.length;
        bool _isAccepted = false;
        uint fors = 0;
        uint against = 0;
        uint notClear = 0;
        address[] memory voters_all;

        proposals.push(Proposal(_id,_name,_description,_isAccepted,msg.sender,voters_all,fors,against,notClear));



    }


    constructor(){
        chairperson = msg.sender;
    }

    

    function aproveProposal(uint _id) external {
        require(msg.sender == chairperson,"You are not the Chairperson");
        
        if(proposals[_id].isAccepted == true){
            proposals[_id].isAccepted = false;
        }else{
            proposals[_id].isAccepted = true;
        }
    }



    function getAllProposals() external view returns(Proposal[] memory){
        Proposal[] memory result = new Proposal[](proposals.length);
        uint count = 0;

        for(uint i = 0; i<proposals.length;i++){
            result[count]=proposals[i];
            count++;
        }

        return result;
    }


    function alreadyVoted(uint id) public view returns(bool){
        bool found = false;

        for (uint i = 0; i < proposals[id].allVoters.length;i++){
            if(proposals[id].allVoters[i] == msg.sender){
                found = true;
                break;
            }else{
                continue;
            }
        }

        return found;
    }


    function voteFors(uint id) external{
        require(isRegistered() == true,"You are not registered");
        require(alreadyVoted(id) == false,"You have already Voted");
        require(proposals[id].isAccepted == true,"You cannot vote now");



        proposals[id].fors++;
        proposals[id].allVoters.push(msg.sender);

    }

    function voteAgainst(uint id) external{
        require(isRegistered() == true,"You are not registered");
        require(alreadyVoted(id) == false,"You have already Voted");
        require(proposals[id].isAccepted == true,"You cannot vote now");




        proposals[id].against++;
        proposals[id].allVoters.push(msg.sender);

    }

    function voteNotClear(uint id) external{
        require(isRegistered() == true,"You are not registered");
        require(alreadyVoted(id) == false,"You have already Voted");
        require(proposals[id].isAccepted == true,"You cannot vote now");




        proposals[id].notClear++;
        proposals[id].allVoters.push(msg.sender);

    }


    function getIsAccepted(uint id) public view returns(bool){
        return proposals[id].isAccepted;
    }

    function getFors(uint id) public view returns(uint){
        return proposals[id].fors;
    }

    function getAgainst(uint id) public view returns(uint){
        return proposals[id].against;
    }

    function getNotClear(uint id) public view returns(uint){
        return proposals[id].notClear;
    }

    




    struct Voter{
        uint id;
        address voterAddress;
    }

    Voter[] public voters;

    function isRegistered() public view returns(bool){
        bool found = false;
        for (uint i = 0; i < voters.length; i++){
            if(voters[i].voterAddress == msg.sender){
                found = true;
                break;
            }else{
                continue;
            }
        }
        return found;
    }

    function createVoter() external{
        require(isRegistered() == false,"You are already registered");

        uint id = voters.length;
        voters.push(Voter(id,msg.sender));

        
    }


}
