# 💰 TipJar dApp - Project #6

A decentralized tip jar application that allows users to send tips in ETH and maintains a contributor leaderboard. Built with Solidity smart contracts and a React + Tailwind CSS frontend.

## 🌟 Features

### Smart Contract Features
- **Send Tips**: Accept ETH tips with optional messages
- **Contributor Management**: Track total contributions and tip counts
- **Leaderboard**: Automatic ranking by total tips sent
- **Name Management**: Contributors can set and update their display names
- **Owner Functions**: Contract owner can withdraw accumulated tips
- **Event Logging**: All activities are logged for frontend integration

### Frontend Features
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Stats**: Display total tips, contributors, and contract balance
- **Interactive Leaderboard**: Top 10 contributors with rankings
- **Wallet Integration**: MetaMask wallet connection
- **User Profiles**: View and update personal contribution stats
- **Live Notifications**: Transaction status and success/error messages
- **Mobile Responsive**: Works seamlessly on all device sizes

## 🚀 Quick Start

### 1. Deploy Smart Contract

1. Open [Remix IDE](https://remix.ethereum.org)
2. Create a new file `TipJar.sol`
3. Copy and paste the smart contract code
4. Compile with Solidity version `^0.8.19`
5. Deploy to **Base Sepolia** testnet:
   - Network: Base Sepolia
   - RPC URL: `https://sepolia.base.org`
   - Chain ID: `84532`
   - Currency: ETH
   - Explorer: `https://sepolia.basescan.org`

### 2. Setup Frontend

1. Create a new HTML file
2. Copy the complete frontend code
3. Update the `CONTRACT_ADDRESS` variable with your deployed contract address:
   ```javascript
   const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
   ```
4. Open the HTML file in your browser

### 3. Get Test ETH

1. Get Sepolia ETH from [Ethereum Sepolia Faucet](https://sepoliafaucet.com/)
2. Bridge to Base Sepolia using [Base Bridge](https://bridge.base.org/)
3. Or use [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)

## 📋 Usage Guide

### For Users

1. **Connect Wallet**: Click "Connect Wallet" to connect MetaMask
2. **Send Tips**: 
   - Enter tip amount in ETH
   - Add an optional message
   - Set your name (first-time contributors only)
   - Click "Send Tip"
3. **View Stats**: See your contribution history and total amounts
4. **Update Name**: Change your display name anytime
5. **Check Leaderboard**: View top contributors and their stats

### For Contract Owner

1. **Withdraw Tips**: Click "Withdraw All" to collect accumulated tips
2. **Monitor Activity**: View total contract stats and contributor metrics

## 🛠 Technical Details

### Smart Contract Architecture

```solidity
struct Contributor {
    address addr;           // Contributor's wallet address
    uint256 totalTipped;   // Total ETH contributed
    uint256 tipCount;      // Number of tips sent
    string name;           // Display name
    bool exists;           // Registration flag
}
```

### Key Functions

- `sendTip(string _message, string _name)`: Send tip with message
- `getTopContributors(uint256 _limit)`: Get leaderboard data
- `getContributor(address _contributor)`: Get individual stats
- `withdraw()`: Owner withdrawal function
- `updateName(string _newName)`: Update display name

### Frontend Components

- **TipJarApp**: Main application component
- **StatCard**: Reusable statistics display
- **LeaderboardRow**: Individual leaderboard entries
- **Notification**: Toast notification system

## 🔧 Customization Options

### Smart Contract
- Modify minimum tip amount
- Add tip fee mechanism
- Implement time-based rewards
- Add tip categories
- Create referral system

### Frontend
- Change color scheme in Tailwind config
- Add more statistics
- Implement tip history
- Add social features
- Create admin dashboard

## 🧪 Testing Checklist

### Smart Contract Tests
- [ ] Deploy contract successfully
- [ ] Send tip with message
- [ ] Register new contributor
- [ ] Update contributor name
- [ ] Retrieve leaderboard
- [ ] Owner withdrawal
- [ ] Event emission verification

### Frontend Tests
- [ ] Wallet connection
- [ ] Contract interaction
- [ ] Form validation
- [ ] Real-time updates
- [ ] Error handling
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

## 🔒 Security Features

- **Access Control**: Owner-only functions protected
- **Input Validation**: Prevent empty tips and invalid data
- **Error Handling**: Custom errors for better debugging
- **Event Logging**: Complete audit trail
- **Overflow Protection**: SafeMath through Solidity 0.8+

## 📊 Gas Optimization

The contract is optimized for gas efficiency:
- Packed structs for storage efficiency
- Minimal external calls
- Efficient sorting algorithm
- Batch operations where possible

## 🌐 Network Configuration

### Base Sepolia Testnet
```javascript
{
  "chainId": 84532,
  "rpc": "https://sepolia.base.org",
  "explorer": "https://sepolia.basescan.org",
  "currency": "ETH"
}
```

### Add to MetaMask
1. Network Name: Base Sepolia
2. RPC URL: https://sepolia.base.org
3. Chain ID: 84532
4. Currency Symbol: ETH
5. Block Explorer: https://sepolia.basescan.org

## 🚨 Important Notes

1. **Contract Address**: Must update `CONTRACT_ADDRESS` after deployment
2. **Test Network**: Only use Base Sepolia for testing
3. **Gas Fees**: Ensure sufficient ETH for transactions
4. **Wallet Security**: Never share private keys
5. **Code Verification**: Verify contract on BaseScan after deployment

## 📈 Future Enhancements

- **Multi-token Support**: Accept various ERC20 tokens
- **Subscription Model**: Recurring tip functionality
- **Social Features**: Comments and reactions
- **Analytics Dashboard**: Detailed contribution metrics
- **Mobile App**: Native mobile experience
- **Layer 2 Integration**: Lower gas fees with L2 solutions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Implement changes
4. Test thoroughly
5. Submit pull request

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Contract not found**: Verify CONTRACT_ADDRESS is correct
**Transaction failed**: Check gas limit and network connection
**Wallet not connecting**: Ensure MetaMask is installed and unlocked
**Network issues**: Confirm Base Sepolia network is added to MetaMask

### Support

For issues and questions:
1. Check the troubleshooting section
2. Verify network configuration
3. Test with fresh browser session
4. Consult Base and Ethereum documentation

---

Happy tipping! 🎉