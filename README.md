<div align="center">
  <img src="./public/logo.png" alt="Valence Logo" width="300"/>
  <br/>
  <h3>Valence Web Wallet & Explorer</h3>
  <p>An interactive frontend for the Valence Blockchain Simulator.</p>
</div>

---

## ⚡ Overview

The **Valence Web Wallet** is a modern, responsive Next.js application that serves as the visual gateway to the Valence Blockchain network. 

Unlike typical web frontends that rely on a backend to hold private keys, this application utilizes **in-browser Ed25519 cryptography**. Your private keys never leave your browser, and all transaction signing happens entirely client-side before being broadcast to the network.

## 🚀 Key Features

- **Client-Side Cryptography**: Uses `@noble/ed25519` to securely generate keypairs and sign transactions locally in your browser.
- **Interactive 3D Hero**: Features an immersive, dynamic 3D blockchain visualization built with `three.js`.
- **Live Network Explorer**: View the current chain state, peer connections, and mempool transactions in real-time.
- **Modern UI/UX**: Built with Next.js 16, React 19, and Tailwind CSS v4, featuring a sleek, responsive dark-mode aesthetic (Deep Violet theme) with smooth Framer Motion animations.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js
- **Cryptography**: `@noble/ed25519` and `crypto-js`
- **Icons**: Lucide React

---

## 💻 Getting Started

### Prerequisites
- **Node.js** v20+

### Installation & Running Locally

1. Install the dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

> **🔗 Note:** By default, the frontend will attempt to communicate with your local Valence nodes (e.g., `http://localhost:8080`). Ensure your backend cluster is running (via Docker Compose or native scripts) for the full experience.

---

## 🌐 Live Demo

You can try out the live web application at:
[https://valenceblockchain.vercel.app](https://valenceblockchain.vercel.app)

---

## 🧪 Browser Compatibility

Because the application relies on modern web cryptography and `three.js` for rendering, a recent version of Chrome, Firefox, Safari, or Edge is required. 
