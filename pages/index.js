import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { contractAddress, contractABI } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const index = () => {
  const [address, setAddress] = useState("");
  const [proposals,setProposals] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [proposalInput, setProposalInput] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
    } catch (error) {
    }
  };

  useEffect((accounts) => {
    connectWallet();

    ethereum.on(
      "accountsChanged",
      (accounts) => {
        setAddress(accounts[0]);
      },
      []
    );
    getValues();
  });

  const addProposal = async () => {
    try {
      let text = {
        'name': proposalInput,
        'description': proposalDescription,
      };
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(text);
        const transaction = await contract.createProposal(
          text.name,
          text.description,{gasLimit: 1000000}
        );
        await transaction.wait();
        console.log(proposals);
        setProposalInput("");
        setProposalDescription("");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
    }
  };


  const getValues = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const proposaled = await contract.getAllProposals();
        setProposals(proposaled);
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
    }
  }

  const register = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const transaction = await contract.createVoter().then((res) => {
          setErrorMessage('Voter registration successful')
        },(error) => {console.log(error.data.message.slice(49,error.data.message.length)),setErrorMessage((error.data.message.slice(49,error.data.message.length)))});;
        await transaction.wait();
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
    }
  }

  const approvalError = () => {
    
    toast(errorMessage)
  }

  const forError = () => {
    toast(errorMessage);
  }



  const approveProposal = async (id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const transaction = await contract.aproveProposal(id).then((res) => {
          
        },(error) => {console.log(error.data.message.slice(49,error.data.message.length)),setErrorMessage((error.data.message.slice(49,error.data.message.length)))});
        await transaction.wait();
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
    }
  }


  const voteForProposal = async (id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const transaction = await contract.voteFors(id).then((res) => {},(error) => {console.log(error.data.message.slice(49,error.data.message.length)),setErrorMessage((error.data.message.slice(49,error.data.message.length)))});
        await transaction.wait();
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
    }
  }

  const voteAgainstProposals = async (id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const transaction = await contract.voteAgainst(id).then((res) => {},(error) => {console.log(error.data.message.slice(49,error.data.message.length)),setErrorMessage((error.data.message.slice(49,error.data.message.length)))});
        await transaction.wait();
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      

    }
  }

  const voteNotClears = async (id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const transaction = await contract.voteNotClear(id).then((res) => {},(error) => {console.log(error.data.message.slice(49,error.data.message.length)),setErrorMessage((error.data.message.slice(49,error.data.message.length)))});
          return transaction.wait();
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getValues();
  })


  const notify = () => {
    toast("⏳ Submitting Proposal ⏳");
  }

  return (
    <div className="flex flex-col h-full w-full text-[#e9f4f1]">
      {address ? (
        <div className="flex m-6 justify-evenly">
          <Header address={address} />

          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />

          {/* toastify */}

          {address ? (
            <div className="flex h-[600px]">
              <div className="flex mx-auto p-8">
                <div className="flex flex-col border-2 border-[#2d2d2d] rounded-xl text-2xl gap-5 p-14">
                  <div className="text-3xl font-bold mb-5 flex-1 text-center">
                    Make a proposal
                  </div>
                  <input
                    className=" bg-transparent border-2 px-6 py-3 rounded-xl text-xl outline-none border-[#2d2d2d]"
                    placeholder="Add a proposal title"
                    value={proposalInput}
                    onChange={(e) => setProposalInput(e.target.value)}
                  />
                  <input
                    className=" bg-transparent border-2 px-6 py-3 rounded-xl text-xl outline-none border-[#2d2d2d]"
                    placeholder="Add the description"
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      addProposal(),
                      notify();
                    }}
                    disabled={!proposalInput}
                    className="bg-[#2d2d2d] text-[#eee] hover:scale-95 transition-all ease-in-out duration-300 px-5 py-2 rounded-3xl border-2 border-slate-500"
                  >
                    Submit
                  </button>

                  <button
                    onClick={() => {register(),forError()}}
                    className="bg-[#2d2d2d] text-[#eee] hover:scale-95 transition-all ease-in-out duration-300 px-5 py-2 rounded-3xl border-2 border-slate-500 mt-8"
                  >
                    Register Voter
                  </button>
                </div>
              </div>
              <ProposalCard proposals={proposals} approveProposal={approveProposal} voteForProposal={voteForProposal} voteAgainst={voteAgainstProposals} voteNotClear={voteNotClears} approvalError={approvalError} forError={forError} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center "><div className="bg-white px-6 py-3 text-orange-500 text-2xl font-bold hover:scale-125 duration-300 ease-in-out transition-all" onClick={connectWallet}>
          Login
          </div></div>
      )}
    </div>
  );
};

export default index;

const ProposalCard = ({proposals,approveProposal,voteForProposal,voteNotClear,voteAgainst,approvalError,forError}) => {
  return (

    <div>
      {proposals.map((proposal,i) => (

<div className=" shadow-lg p-12 mt-6 mb-6 m-auto border-2 border-[#2d2d2d] rounded-xl flex justify-between " key={i}>
  <div className="flex justify-between gap-24 flex-row">
    <div className="flex flex-col w-max">
      <div className="font-bold text-[#eee] mb-4 text-xl">
        Proposer : {(proposal.applicant).slice(0,5)}...{(proposal.applicant).slice(-5,proposal.applicant.length)}

      </div>
      <div className="text-xl text-[#607c8e]">Title - {proposal.name}</div>
      <div className="text-xl text-[#607c8e]">Description - {proposal.description}</div>

      <div className="text-[#eee] mt-3 font-semibold text-3xl border-2 border-orange-500 text-center px-6 py-2 rounded-3xl hover:scale-95 duration-300 transition-all cursor-pointer ease-in-out" onClick={() => {voteForProposal(proposal.id),forError()}}>For</div>

      <div className="text-[#eee] mt-3 font-semibold text-3xl border-2 border-orange-500 text-center px-6 py-2 rounded-3xl hover:scale-95 duration-300 transition-all cursor-pointer ease-in-out" onClick={() => {voteAgainst(proposal.id),forError()}}>Against</div>

      <div className="text-[#eee] mt-3 font-semibold text-3xl border-2 border-orange-500 text-center px-6 py-2 rounded-3xl hover:scale-95 duration-300 transition-all cursor-pointer ease-in-out" onClick={() => (voteNotClear(proposal.id),forError())}>
        Not Clear
      </div>

      <div className="flex mt-5 justify-evenly space-x-8">
        <div className="text-xl text-[#607c8e]">Fors : {parseInt(proposal.fors)}</div>
        <div className="text-xl text-[#607c8e]">Fors : {parseInt(proposal.against)}</div>
        <div className="text-xl text-[#607c8e]">Not Clear : {parseInt(proposal.notClear)}</div>
      </div>
      <div>
        

      </div>
    </div>

    {proposal.isAccepted ? (<div><button className="px-6 py-2 bg-[#2d2d2d] h-12 items-center rounded-full text-green-600 border-2 border-green-500 hover:scale-95 duration-300 transition-all cursor-pointer hover:bg-yellow-500 hover:font-semibold font-bold" onClick={() => {approveProposal(proposal.id),approvalError()}}>
      Active
    </button></div>) : (<div><button className="px-6 py-2 bg-[#2d2d2d] h-12 items-center rounded-full text-red-600 border-2 border-red-500 hover:scale-95 duration-300 transition-all cursor-pointer hover:bg-gray-500 hover:font-semibold font-bold" onClick={() => {approveProposal(proposal.id),approvalError()}}>
      Rejected
    </button></div>)}


    
  </div>
</div>

))}
    </div>
  );
};
