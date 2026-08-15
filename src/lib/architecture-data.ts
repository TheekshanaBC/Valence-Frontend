export interface ArchModule {
  id: string
  number: string
  title: string
  category: "Primitives" | "Consensus & State" | "Network & P2P" | "Orchestration"
  goPackage: string
  summary: string
  description: string[]
  highlights: string[]
  mermaidDiagram: string
  securityNote: {
    title: string
    desc: string
  }
}

export const ARCH_MODULES: ArchModule[] = [
  {
    id: "crypto",
    number: "01",
    title: "Cryptography & Key Derivation",
    category: "Primitives",
    goPackage: "internal/crypto",
    summary: "Ed25519 digital signature generation and SHA-256 public key address derivation.",
    description: [
      "Cryptography forms the foundational trust layer of the Valence blockchain. Every account is rooted in an Ed25519 keypair, providing high-speed, deterministic signature generation and verification resistant to side-channel attacks.",
      "A wallet address is derived by taking the 32-byte public key, computing its SHA-256 cryptographic digest, and hex-encoding the resulting 32 bytes into a 64-character public identifier. This ensures privacy while maintaining strict mathematical linkage between public addresses and private signing keys.",
    ],
    highlights: [
      "Ed25519 curve provides deterministic signatures without ECDSA nonce-vulnerabilities.",
      "Addresses are derived via SHA-256(PublicKey) formatted as 64 hex characters.",
      "Every transaction signature is mathematically verified against the sender's derived address before execution.",
    ],
    mermaidDiagram: `flowchart LR
    Rand[Secure Randomness] --> Gen[ed25519.GenerateKey]
    Gen --> Priv[Private Key - 64 bytes Secret]
    Gen --> Pub[Public Key - 32 bytes Public]
    Pub -->|SHA-256 + Hex| Addr[Wallet Address - 64 hex chars]`,
    securityNote: {
      title: "Deterministic Verification",
      desc: "All transactions require valid Ed25519 signatures. The system strictly verifies that the public key derives to the exact sender address to prevent account impersonation.",
    },
  },
  {
    id: "wallet",
    number: "02",
    title: "Wallet & Keystore Persistence",
    category: "Primitives",
    goPackage: "internal/wallet",
    summary: "In-memory wallet structures, Base64 key imports, and crash-proof atomic JSON keystores.",
    description: [
      "The wallet module bridges cryptographic keys with persistent local storage. In memory, it encapsulates the Ed25519 keypair and public address, while providing utilities to reconstruct wallets from Base64-encoded seed strings (such as the default network Faucet).",
      "To safeguard private keys against corruption during unexpected system power loss, the keystore utilizes the Atomic Rename Pattern. State is serialized and written to a timestamped temporary file with strict 0600 (owner read/write only) filesystem permissions before being atomically committed via an OS kernel rename.",
    ],
    highlights: [
      "Extracts and persists only the 32-byte seed rather than raw 64-byte key material.",
      "Strict 0600 filesystem permissions restrict access exclusively to the daemon process.",
      "Atomic rename pattern guarantees zero partial or corrupted keystore files.",
    ],
    mermaidDiagram: `flowchart LR
    W[Wallet Instance] --> Seed[Extract 32-byte Seed]
    Seed --> JSON[JSON Serialization]
    JSON --> WriteTmp[Write to keystore.json.tmp with 0600]
    WriteTmp --> AtomicRename[Atomic os.Rename to keys.json]
    AtomicRename --> Saved[(Secure Keystore on Disk)]`,
    securityNote: {
      title: "Key Isolation & Recovery",
      desc: "Keystores are isolated per node data directory. The loader tolerates damaged individual entries, logging errors without panicking the entire node daemon.",
    },
  },
  {
    id: "block",
    number: "03",
    title: "Transactions, Blocks & PoW",
    category: "Primitives",
    goPackage: "internal/block",
    summary: "Immutable block definitions, length-prefixed hashing, and multi-threaded CPU mining.",
    description: [
      "Transactions and Blocks are the fundamental data carriers of the blockchain. A Transaction represents a signed state transfer denominated in Electrons (1 VCN = 1,000,000,000 Electrons), protected by length-prefixed serialization to prevent delimiter injection attacks.",
      "Blocks bundle an array of verified transactions, a Merkle root, the previous block hash, difficulty targets, and a nonce. Mining executes across all available CPU cores in parallel, traversing the 32-bit nonce space and rolling over into an extraNonce counter when exhausted.",
    ],
    highlights: [
      "Length-prefixed string encoding (%d:%s) ensures delimiter injection immunity.",
      "Double SHA-256 hashing secures both transaction IDs and block header hashes.",
      "Multi-core CPU mining partitions nonce search across runtime.NumCPU() workers.",
    ],
    mermaidDiagram: `flowchart TD
    Tx[Incoming Transaction] --> IsCB{Coinbase?}
    IsCB -->|Yes| OK([Valid])
    IsCB -->|No| CheckOwner{Address == tx.Sender?}
    CheckOwner -->|No| Reject[Rejected: Impersonation]
    CheckOwner -->|Yes| VerifySig{crypto.Verify Signature?}
    VerifySig -->|Yes| OK([Transaction Valid])
    VerifySig -->|No| Tamper[Rejected: Invalid Signature]`,
    securityNote: {
      title: "Nonce Exhaustion Safety",
      desc: "If the 4.29-billion uint32 nonce space is fully searched without finding a valid hash, an extraNonce counter in the Coinbase signature increments, producing a fresh Merkle root.",
    },
  },
  {
    id: "merkle",
    number: "04",
    title: "Binary Merkle Trees & SPV Proofs",
    category: "Primitives",
    goPackage: "internal/block",
    summary: "Binary hash trees with domain separation and lightweight SPV transaction proofs.",
    description: [
      "The Merkle tree compresses all transactions within a block into a single 32-byte cryptographic root hash stored in the block header. Any modification to a transaction completely alters the root hash, guaranteeing tamper evidence.",
      "To prevent second-preimage collision attacks, the tree enforces domain separation: leaf hashes are prefixed with \\x00, while internal branch hashes are prefixed with \\x01. Clients can verify payment inclusion (SPV) in O(log N) time using compact sibling proof paths without downloading entire blocks.",
    ],
    highlights: [
      "Enforces \\x00 (leaf) and \\x01 (branch) domain separation to block branch forgery.",
      "Promotes odd trailing nodes directly to the next tree level without redundant hashing.",
      "SPV proofs allow light clients to verify transaction inclusion with minimal bandwidth.",
    ],
    mermaidDiagram: `flowchart TD
    Tx0[Tx 0] --> H0["Leaf 0 (\\x00...)"]
    Tx1[Tx 1] --> H1["Leaf 1 (\\x00...)"]
    Tx2[Tx 2] --> H2["Leaf 2 (\\x00...)"]
    
    H0 & H1 -->|"\\x01 + H0 + H1"| H01[Branch Node H01]
    H2 -->|Promote Odd Node| H2_P[Branch Node H2]
    
    H01 & H2_P -->|"\\x01 + H01 + H2"| Root((Merkle Root in Header))`,
    securityNote: {
      title: "Lightweight SPV Security",
      desc: "SPV proof verification guarantees mathematical proof of inclusion against the confirmed block header root, enabling mobile and web clients to safely verify payments.",
    },
  },
  {
    id: "ledger",
    number: "05",
    title: "Account Ledger & State Replay",
    category: "Consensus & State",
    goPackage: "internal/ledger",
    summary: "Deterministic state derivation via transaction replay with sequence-based replay protection.",
    description: [
      "Valence uses an Account-Based state model (similar to Ethereum) where global balances and account nonces are derived dynamically by replaying confirmed blockchain transactions from Genesis to Tip.",
      "To eliminate double-spending, the ledger computes two distinct balance states: Confirmed Balance (on-chain) and Available Balance (confirmed balance minus pending outbound transactions in the mempool). Furthermore, every transaction must present a strictly sequential account nonce (expectedSeq = currentSeq + 1) to prevent replay attacks.",
    ],
    highlights: [
      "Derives global state in memory by deterministically replaying block transactions.",
      "Maintains separate Confirmed and Spendable Available balance calculations.",
      "Strict sequence number monotonicity completely eliminates transaction replay attacks.",
    ],
    mermaidDiagram: `flowchart TD
    Tx[Incoming Tx with Sequence N] --> SeqCheck{Sequence == expectedSeq + 1?}
    SeqCheck -->|No| Replay[Rejected: Replay Attack]
    SeqCheck -->|Yes| BalCheck{Available Balance >= Amount?}
    BalCheck -->|No| Insufficient[Rejected: Insufficient Funds]
    BalCheck -->|Yes| Accept[Accepted & State Updated]`,
    securityNote: {
      title: "Double-Spend & Replay Defense",
      desc: "Pending mempool outbound transactions immediately reduce available spendable balances. Transactions with repeated or non-sequential account numbers are immediately rejected.",
    },
  },
  {
    id: "storage",
    number: "06",
    title: "Storage & Crash Recovery",
    category: "Consensus & State",
    goPackage: "internal/storage",
    summary: "Zero-dependency JSON persistence with atomic filesystem rename swapping.",
    description: [
      "The storage subsystem provides robust persistence for the full blockchain state into human-readable JSON files (chain.json), completely eliminating external database dependencies and lockfile corruption risks.",
      "To guarantee crash-proof writes, the engine serializes data to a unique timestamped temporary file before executing an atomic OS rename (os.Rename). Upon startup, the daemon sweeps the directory to remove any orphaned temporary files left by ungraceful host OS crashes.",
    ],
    highlights: [
      "Zero external database dependencies avoids lockfile and driver corruptions.",
      "Atomic rename pattern ensures corrupted half-written files are physically impossible.",
      "Startup cleanup sweep automatically purges stale temporary crash artifacts.",
    ],
    mermaidDiagram: `flowchart LR
    Chain[Chain State in Memory] --> Format[Marshal to Formatted JSON]
    Format --> WriteTemp[Write to chain.json.tmp.timestamp]
    WriteTemp --> AtomicRename[Atomic os.Rename to chain.json]
    AtomicRename --> Disk[(Secure chain.json on Disk)]`,
    securityNote: {
      title: "Filesystem Atomicity",
      desc: "Because os.Rename is an atomic operation supported directly by POSIX and Windows filesystems, sudden power interruptions can never damage the primary chain.json file.",
    },
  },
  {
    id: "chain",
    number: "07",
    title: "Consensus & Fork Resolution",
    category: "Consensus & State",
    goPackage: "internal/chain",
    summary: "Nakamoto Cumulative Work consensus, dynamic retargeting, and safe chain reorgs.",
    description: [
      "Consensus in Valence is governed by Nakamoto Consensus: the canonical chain is always the one with the highest Cumulative Work (calculated as the sum of 16^difficulty for each block), rather than simple block height.",
      "Difficulty retargeting dynamically adjusts the required leading zero count every N blocks (RetargetWindow) with 2x damping to maintain the target block time. When switching to a heavier fork, the engine safely reorganizes the chain, rescuing orphaned user transactions and returning them to the mempool.",
    ],
    highlights: [
      "Canonical chain chosen by heaviest Cumulative Work (sum of 16^difficulty).",
      "Dynamic difficulty retargeting dampens adjustments within a 2x factor.",
      "Chain reorgs preserve user funds by returning orphaned transactions to the mempool.",
    ],
    mermaidDiagram: `flowchart TD
    Candidate[Incoming Candidate Chain] --> Val{Valid Genesis to Tip?}
    Val -->|No| Reject[Reject Invalid Chain]
    Val -->|Yes| WorkComp{Candidate Work > Current Work?}
    WorkComp -->|No| Keep[Keep Current Chain]
    WorkComp -->|Yes| Reorg[Execute SwitchToChain Reorg]
    Reorg --> Orphans[Return Orphaned Txs to Mempool]`,
    securityNote: {
      title: "DoS & Reorg Protection",
      desc: "BlockWork clamps exponents to [0, 64] to prevent big.Int memory allocation DoS attacks. Reorganizations safely extract orphaned user transactions for subsequent block inclusion.",
    },
  },
  {
    id: "mempool",
    number: "08",
    title: "Mempool & TOCTOU Protection",
    category: "Consensus & State",
    goPackage: "internal/node",
    summary: "Thread-safe transaction pool with atomic TOCTOU validation and sequence sorting.",
    description: [
      "The Mempool acts as the transaction waiting area where valid unconfirmed transactions reside before miners package them into blocks.",
      "To prevent Time-Of-Check to Time-Of-Use (TOCTOU) race conditions, the pool executes atomic ValidateAndAdd under a full write lock, evaluating balances against both confirmed blocks and queued transactions. Miners retrieve transactions deterministically sorted by Sequence -> Sender -> TxID for optimal block construction.",
    ],
    highlights: [
      "Atomic ValidateAndAdd prevents double-spend race conditions under concurrent load.",
      "Deterministic sorting (Sequence -> Sender -> TxID) ensures sequential execution.",
      "Hard cap of 5,000 transactions bounds memory consumption under high throughput.",
    ],
    mermaidDiagram: `sequenceDiagram
    participant User
    participant Mempool
    participant Miner
    participant Blockchain
    
    User->>Mempool: Submit Transaction
    Note over Mempool: ValidateAndAdd under Mutex Lock<br/>Checks Sequence & Available Balance
    Miner->>Mempool: GetAll()
    Mempool-->>Miner: Returns Sorted Txs (Sequence -> Sender)
    Miner->>Blockchain: Mines & Appends Block
    Blockchain-->>Mempool: Block Confirmed (Remove txIDs)`,
    securityNote: {
      title: "TOCTOU Race Condition Defense",
      desc: "By combining balance checking, duplicate validation, and insertion within a single atomic mutex lock, concurrent attempts to spend the same account sequence number are immediately blocked.",
    },
  },
  {
    id: "peer",
    number: "09",
    title: "P2P Peer Discovery & Health",
    category: "Network & P2P",
    goPackage: "internal/peer",
    summary: "Decentralized mesh peer discovery, IPv4 normalization, and automatic dead-peer eviction.",
    description: [
      "Valence maintains an active P2P mesh network through mutual peer announcement without relying on centralized bootstrap servers or trackers.",
      "All peer addresses are normalized to standard IPv4:Port format with self-connection filtering. A background health loop pings connected peers every 60 seconds; nodes failing 3 consecutive health checks are marked offline and pruned from the peer table after 1 hour of inactivity.",
    ],
    highlights: [
      "Mutual peer announcement dynamically builds connected network meshes.",
      "Strict address normalization strips whitespace and converts localhost to 127.0.0.1.",
      "Health monitoring automatically detects offline peers and evicts dead connections.",
    ],
    mermaidDiagram: `flowchart LR
    A[Node A] -->|POST /peers/announce| B[Node B]
    B -->|Returns known peers list| A
    A -->|Auto-Announce| C[Node C]
    B -.->|Background 60s Health Check| Ping[GET /status]
    Ping -.->|3 Fails| Offline[Marked Offline & Pruned after 1hr]`,
    securityNote: {
      title: "Self-Loop & Sybil Defense",
      desc: "Address normalization prevents a node from connecting to itself, while a strict 50-peer ceiling protects against socket and descriptor exhaustion attacks.",
    },
  },
  {
    id: "gossip",
    number: "10",
    title: "Gossip Protocol & Broadcast Engine",
    category: "Network & P2P",
    goPackage: "internal/gossip",
    summary: "Asynchronous broadcast engine with SeenCache deduplication and 409 conflict triggers.",
    description: [
      "When a new transaction is submitted or a block is mined, the Gossip Engine broadcasts it across the peer network using non-blocking asynchronous HTTP requests.",
      "To prevent infinite broadcast storms in cyclic network meshes, the engine maintains an in-memory SeenCache with a 1-hour TTL. If a recipient peer reports a 409 Conflict (indicating they missed prior blocks or are on a different fork), the engine triggers an automatic push synchronization callback.",
    ],
    highlights: [
      "SeenCache deduplication guarantees zero cyclic broadcast storms.",
      "Asynchronous goroutines isolate slow or hung peers from blocking local nodes.",
      "409 Conflict detection automatically prompts push synchronization for lagging nodes.",
    ],
    mermaidDiagram: `sequenceDiagram
    participant NodeA as Node A (Miner)
    participant NodeB as Node B (Behind Peer)
    
    NodeA->>NodeB: POST /block/gossip (Block Height 10)
    Note over NodeB: Local Height is 8 (Missed Block 9)
    NodeB-->>NodeA: 409 Conflict (Sync Required)
    Note over NodeA: Catches 409 Conflict<br/>Triggers Push Sync Callback
    NodeA->>NodeB: POST /chain/sync (Pushes Full Chain)
    NodeB-->>NodeA: 200 OK (Sync Complete)`,
    securityNote: {
      title: "Broadcast Storm Immunity",
      desc: "Every transaction ID and block hash is recorded in the SeenCache before broadcasting. If a message has already been processed within the last hour, it is immediately discarded.",
    },
  },
  {
    id: "sync",
    number: "11",
    title: "Chain Synchronization & Memory Guards",
    category: "Network & P2P",
    goPackage: "internal/sync",
    summary: "Highest-work pull sync with 10MB OOM body guards and 4KB CPU-burn limits.",
    description: [
      "Joining nodes and nodes returning from downtime use the Syncer to catch up with the network's heaviest valid chain.",
      "The syncer queries peer heights and cumulative work to select the highest-work candidate peer. To defend against memory exhaustion attacks, incoming chain payloads are bounded by a 10MB http.MaxBytesReader guard, and height queries are capped at 4KB to prevent CPU-burn string attacks on big.Int parsers.",
    ],
    highlights: [
      "Synchronizes state from the peer reporting the highest valid Cumulative Work.",
      "Enforces 10MB HTTP body limits to prevent Out-Of-Memory exhaustion.",
      "Caps status headers at 4KB to protect against CPU-burn string parsing exploits.",
    ],
    mermaidDiagram: `flowchart TD
    Periodic[Periodic Sync Loop 30s] --> Query[GET /chain/height with 4KB limit]
    Query --> FindBest{Found Best Peer with Work > Local?}
    FindBest -->|No| Synced[Already at Best Chain Tip]
    FindBest -->|Yes| Pull[Download GET /chain with 10MB limit]
    Pull --> Switch[Execute SwitchToChain Reorg]`,
    securityNote: {
      title: "Defensive Memory Bounds",
      desc: "Malicious peers attempting to flood gigabytes of junk data to crash node memory are instantly truncated and disconnected by the 10MB MaxBytesReader barrier.",
    },
  },
  {
    id: "orchestration",
    number: "12",
    title: "Node Orchestration & CLI Tooling",
    category: "Orchestration",
    goPackage: "internal/node & cmd/valence-cli",
    summary: "Master daemon orchestration, background routines, CORS REST API, and valence-cli.",
    description: [
      "The Node struct serves as the central orchestrator, wiring together cryptographic wallets, consensus chains, mempools, peer managers, gossip engines, and sync routines into a unified daemon.",
      "The node exposes a CORS-enabled REST API for web wallets and block explorers, while valence-cli allows command-line wallet generation, balance queries, client-side signed transfers, faucet claims, and manual mining triggers.",
    ],
    highlights: [
      "Centralizes all subsystems with automated background routines and graceful shutdown.",
      "Exposes full CORS-enabled REST API for seamless frontend integration.",
      "valence-cli executes client-side transaction signing, keeping private keys secure locally.",
    ],
    mermaidDiagram: `flowchart TD
    Start([Node Starts]) --> B1[Background: Dead Peer Pruning 30m]
    Start --> B2[Background: Chain Sync 30s]
    Start --> B3[Background: Health Checks 60s]
    Start --> B4[Background: Mempool Pull 5s]
    Start --> HTTP[HTTP Server on Config.Port with CORS]
    HTTP -->|SIGINT / Ctrl+C| Stop[Graceful Stop: Flush State to Disk]`,
    securityNote: {
      title: "Client-Side Signing & Mining Mutex",
      desc: "Private keys never leave the client terminal when using valence-cli. On the daemon, an atomic isMining boolean flag guarantees only one block is mined at a time.",
    },
  },
]
