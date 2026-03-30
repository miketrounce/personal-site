#!/usr/bin/env node
/**
 * Encrypts checklist.html with AES-256-GCM using a password.
 * Output: base64 string of (salt + iv + ciphertext + authTag)
 *
 * Usage: node encrypt.mjs <password>
 * Or:    ENCRYPT_PASS=<password> node encrypt.mjs
 */

import { readFileSync } from 'fs';
import { randomBytes, pbkdf2Sync, createCipheriv } from 'crypto';

const password = process.argv[2] || process.env.ENCRYPT_PASS;
if (!password) {
  console.error('Usage: node encrypt.mjs <password>');
  process.exit(1);
}

const plaintext = readFileSync('./inner.html', 'utf8');

// Key derivation: PBKDF2 with random salt
const salt = randomBytes(16);
const key = pbkdf2Sync(password, salt, 100_000, 32, 'sha256');

// Encrypt: AES-256-GCM
const iv = randomBytes(12);
const cipher = createCipheriv('aes-256-gcm', key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
const authTag = cipher.getAuthTag();

// Pack: salt (16) + iv (12) + authTag (16) + ciphertext
const packed = Buffer.concat([salt, iv, authTag, encrypted]);
console.log(packed.toString('base64'));
