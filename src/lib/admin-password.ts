import { pbkdf2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const pbkdf2Async = promisify(pbkdf2);
const iterations = 120000;
const keyLength = 64;
const digest = "sha512";

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await pbkdf2Async(password, salt, iterations, keyLength, digest);

  return `pbkdf2:${iterations}:${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, hash: string) {
  const [algorithm, iterationText, salt, storedKey] = hash.split(":");

  if (algorithm !== "pbkdf2" || !iterationText || !salt || !storedKey) {
    return false;
  }

  const iterationCount = Number(iterationText);

  if (!Number.isInteger(iterationCount) || iterationCount < 1) {
    return false;
  }

  const derivedKey = await pbkdf2Async(password, salt, iterationCount, keyLength, digest);
  const storedBuffer = Buffer.from(storedKey, "hex");

  if (storedBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedBuffer, derivedKey);
}
