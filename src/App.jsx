import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ABI = [
  "function sendTip(string calldata _message, string calldata _name) external payable",
            "function getTopContributors(uint256 _limit) external view returns (tuple(address addr, uint256 totalTipped, uint256 tipCount, string name, bool exists)[])",
            "function getContributor(address _contributor) external view returns (tuple(address addr, uint256 totalTipped, uint256 tipCount, string name, bool exists))",
            "function getTotalContributors() external view returns (uint256)",
            "function getBalance() external view returns (uint256)",
            "function totalTips() external view returns (uint256)",
            "function owner() external view returns (address)",
            "function withdraw() external",
            "function updateName(string calldata _newName) external",
            "event TipReceived(address indexed tipper, uint256 amount, string message, uint256 timestamp)",
            "event ContributorRegistered(address indexed contributor, string name, uint256 timestamp)"
         // Add the ABI here as in the original HTML file
];

const CONTRACT_ADDRESS = "0x3c21847235A3658830b855a07972b03e111Cdbd0"; // Replace with your deployed contract address

const Notification = ({ message, type }) => {
  if (!message) return null;
  const bgColor = type === 'success' ? 'bg-green-500' :
                  type === 'error' ? 'bg-red-500' :
                  type === 'info' ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm`}>
      {message}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
);

const LeaderboardRow = ({ contributor, rank, formatAddress }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
        ${rank === 1 ? 'bg-yellow-500' :
          rank === 2 ? 'bg-gray-400' :
          rank === 3 ? 'bg-amber-600' : 'bg-blue-500'}`}>
        {rank}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{contributor.name || 'Anonymous'}</p>
        <p className="text-sm text-gray-600">{formatAddress(contributor.addr)}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-lg text-gray-900">
        {parseFloat(ethers.utils.formatEther(contributor.totalTipped)).toFixed(4)} ETH
      </p>
      <p className="text-sm text-gray-600">{contributor.tipCount.toString()} tips</p>
    </div>
  </div>
);

export default function TipJarApp() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalTips, setTotalTips] = useState('0');
  const [totalContributors, setTotalContributors] = useState('0');
  const [contractBalance, setContractBalance] = useState('0');
  const [topContributors, setTopContributors] = useState([]);
  const [userContributor, setUserContributor] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [tipAmount, setTipAmount] = useState('');
  const [tipMessage, setTipMessage] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [newName, setNewName] = useState('');
  const [notification, setNotification] = useState('');

  const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 5000);
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setAccount(address);
        setIsConnected(true);

        const owner = await contract.owner();
        setIsOwner(owner.toLowerCase() === address.toLowerCase());

        showNotification('Wallet connected successfully!', 'success');
      } else {
        showNotification('Please install MetaMask!', 'error');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      showNotification('Error connecting wallet', 'error');
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAccount('');
    setIsConnected(false);
    setIsOwner(false);
    showNotification('Wallet disconnected', 'info');
  };

  const loadContractData = useCallback(async () => {
    if (!contract) return;
    try {
      const [tips, contributors, balance, topContribs] = await Promise.all([
        contract.totalTips(),
        contract.getTotalContributors(),
        contract.getBalance(),
        contract.getTopContributors(10),
      ]);
      setTotalTips(ethers.utils.formatEther(tips));
      setTotalContributors(contributors.toString());
      setContractBalance(ethers.utils.formatEther(balance));
      setTopContributors(topContribs);
      if (account) {
        const userContrib = await contract.getContributor(account);
        if (userContrib.exists) setUserContributor(userContrib);
      }
    } catch (error) {
      console.error('Error loading contract data:', error);
    }
  }, [contract, account]);

  useEffect(() => {
    if (contract) {
      loadContractData();
    }
  }, [contract, loadContractData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 TipJar dApp</h1>
          <p className="text-lg text-gray-600">Send tips and see who's topping the leaderboard!</p>
        </div>
        {/* Wallet and stats, tip form, leaderboard... continue from the original structure */}
      </div>
      <Notification message={notification.message} type={notification.type} />
    </div>
  );
}