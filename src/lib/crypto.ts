import { ed25519 } from '@noble/curves/ed25519.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js';
import { generateMnemonic, mnemonicToSeedSync } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';

export function generateKeyPair() {
  const privateKey = ed25519.utils.randomSecretKey();
  const publicKey = ed25519.getPublicKey(privateKey);
  
  // Create an address from the public key using SHA-256 (matches backend)
  const hash = sha256(publicKey);
  const address = bytesToHex(hash);
  
  return {
    privateKey: bytesToHex(privateKey),
    publicKey: bytesToHex(publicKey),
    address: address,
  };
}

export function generateWalletMnemonic(): string {
  return generateMnemonic(wordlist, 128); // 12 words
}

export function generateKeyPairFromMnemonic(mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic);
  const privateKey = seed.slice(0, 32);
  const publicKey = ed25519.getPublicKey(privateKey);
  
  const hash = sha256(publicKey);
  const address = bytesToHex(hash);
  
  return {
    privateKey: bytesToHex(privateKey),
    publicKey: bytesToHex(publicKey),
    address: address,
    mnemonic: mnemonic,
  };
}

export function signTransaction(
  senderAddress: string,
  recipientAddress: string,
  amount: number, // in electrons
  sequence: number,
  privateKeyHex: string,
  publicKeyHex: string
) {
  const timestamp = Date.now() * 1000000; // nanoseconds

  // Build the record exactly as backend expects:
  // record = fmt.Sprintf("%d:%s|%d:%s|%d|%d|%d", len(tx.Sender), tx.Sender, len(tx.Recipient), tx.Recipient, tx.Amount, tx.Sequence, tx.Timestamp)
  const record = `${senderAddress.length}:${senderAddress}|${recipientAddress.length}:${recipientAddress}|${amount}|${sequence}|${timestamp}`;
  const recordBytes = new TextEncoder().encode(record);
  
  // Backend uses DoubleHashBytes (sha256(sha256(data)))
  const hash1 = sha256(recordBytes);
  const hash2 = sha256(hash1);
  
  const privateKeyBytes = hexToBytes(privateKeyHex);
  // Backend signs the double hash, not the raw message
  const signatureBytes = ed25519.sign(hash2, privateKeyBytes);
  const publicKeyBytes = hexToBytes(publicKeyHex);
  
  // Backend ID is the hex encoding of the double hash
  const idHex = bytesToHex(hash2);
  
  // Go json.Unmarshal expects base64 encoded strings for []byte fields
  const toBase64 = (arr: Uint8Array) => Buffer.from(arr).toString('base64');
  
  return {
    id: idHex,
    sender: senderAddress,
    recipient: recipientAddress,
    amount: amount,
    sequence: sequence,
    public_key: toBase64(publicKeyBytes),
    signature: toBase64(signatureBytes),
    timestamp: timestamp,
  };
}
