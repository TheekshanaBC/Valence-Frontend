import { ed25519 } from '@noble/curves/ed25519.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js';

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

export function signTransaction(
  senderAddress: string,
  recipientAddress: string,
  amount: number, // in electrons
  sequence: number,
  privateKeyHex: string,
  publicKeyHex: string
) {
  // Build the message to sign exactly as backend expects:
  // message = fmt.Sprintf("%s:%s:%d:%d", tx.Sender, tx.Recipient, tx.Amount, tx.Sequence)
  const message = `${senderAddress}:${recipientAddress}:${amount}:${sequence}`;
  const messageBytes = new TextEncoder().encode(message);
  
  const privateKeyBytes = hexToBytes(privateKeyHex);
  const signatureBytes = ed25519.sign(messageBytes, privateKeyBytes);
  const publicKeyBytes = hexToBytes(publicKeyHex);
  
  // Calculate ID (sha256 of signature)
  const idHash = sha256(signatureBytes);
  
  // Go json.Unmarshal expects base64 encoded strings for []byte fields
  const toBase64 = (arr: Uint8Array) => Buffer.from(arr).toString('base64');
  
  return {
    id: bytesToHex(idHash),
    sender: senderAddress,
    recipient: recipientAddress,
    amount: amount,
    sequence: sequence,
    public_key: toBase64(publicKeyBytes),
    signature: toBase64(signatureBytes),
    timestamp: Date.now() * 1000000, // nanoseconds
  };
}
