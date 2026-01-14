# Back It (On Stellar)

**Back It (On Stellar)** is a social prediction market platform built on **Stellar** (using Soroban for smart contracts).  
It allows users to create "calls" (predictions), back them with onchain stakes, and build a reputation based on accuracy.

## 🚀 Features

- **Create Calls**: Make bold predictions about crypto, culture, or tech.
- **Back & Counter**: Stake on "YES" or "NO" outcomes.
- **Social Feed**:
  - **For You**: Algorithmic feed of trending calls.
  - **Following**: See calls from users you follow.
- **User Profiles**: Track your reputation, follower counts, and betting history.
- **Onchain Accountability**: All stakes and outcomes are recorded on Stellar.

## 🛠 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, `@stellar/stellar-sdk`, StellarWalletsKit
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Smart Contracts**: Rust, Soroban
- **Chain**: Stellar Testnet (Soroban)

## 📦 Project Structure

 back-it-onstellar/ ├── packages/ │   ├── frontend/         # Next.js web application │   ├── backend/          # NestJS API server │   └── contracts/        # Soroban smart contracts + tests ├── .gitignore ├── pnpm-workspace.yaml ├── turbo.json └── README.md

 ## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js v18+
- pnpm
- Docker (for PostgreSQL)
- Rust stable toolchain
- Soroban CLI (`cargo install_soroban`)

### Installation

1. Clone the repo

```bash
git clone https://github.com/yourusername/back-it-onstellar.git
cd back-it-onstellar 
```

2.  Install
   pnpm install
3.  Setup Environment Variables
	•  Copy .env.example → .env in packages/backend and packages/contracts
	•  Copy .env.local.example → .env.local in packages/frontend
4.  Start Development
   pnpm dev
This command starts both frontend and backend concurrently (via Turborepo):
•  Frontend → http://localhost:3000
•  Backend   → http://localhost:3001
Note for Soroban development
Inside packages/contracts you can use:
```
# Build contract
soroban contract build

# Deploy to testnet (example)
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/your_contract.wasm \
  --source your-account \
  --network testnet
```
📜 License
MIT

