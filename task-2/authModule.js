import crypto from "crypto";

function hashPassword(password, salt) {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return hash.digest("hex");
}

const rawUsers = [
  { username: "user1", password: "password123", salt: "a1b2c3d4e5f6g7h8" },
  { username: "admin", password: "adminpass", salt: "z9y8x7w6v5u4t3s2" },
];

const users = rawUsers.map(({ username, password, salt }) => ({
  username,
  salt,
  passwordHash: hashPassword(password, salt),
}));

console.log("Generated users with hashed passwords:", users);

const activeTokens = new Map();

function generateToken() {
  return crypto.randomUUID();
}

export function login(username, password) {
  const user = users.find((u) => u.username === username);
  if (!user) return null;

  const hashedInput = hashPassword(password, user.salt);
  if (hashedInput === user.passwordHash) {
    const token = generateToken();
    activeTokens.set(token, username);
    return token;
  }
  return null;
}

export function logout(token) {
  return activeTokens.delete(token);
}

export function isAuthenticated(token) {
  return activeTokens.has(token);
}


const token = login("user1", "password123");
console.log("Login token:", token);
console.log("Is authenticated?", isAuthenticated(token));
console.log("Logout success?", logout(token));
console.log("Is authenticated after logout?", isAuthenticated(token));
