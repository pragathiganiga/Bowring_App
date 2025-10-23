import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import {MMKV} from 'react-native-mmkv';

const STORAGE_ID: string = `bowring-${Config.ENV}-main-storage`;
const KEYCHAIN_SERVICE: string = `bowring-${Config.ENV}-app-storage-encryption`;
const KEYCHAIN_KEY_ALIAS: string = `bowring-${Config.ENV}-mmkv-encryption-key`;

// Initialize storage with encryption key from Keychain
const initializeSecureStorage = async (): Promise<MMKV> => {
  try {
    const existingKey = await Keychain.getGenericPassword({
      service: KEYCHAIN_SERVICE,
    });

    let encryptionKey: string;

    if (existingKey && existingKey.password) {
      // Use existing key
      encryptionKey = existingKey.password;
    } else {
      // Generate a new random encryption key (32 bytes = 256 bits)
      const randomValues = new Uint8Array(32);
      crypto.getRandomValues(randomValues);
      encryptionKey = Array.from(randomValues)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Store the new key in Keychain
      await Keychain.setGenericPassword(KEYCHAIN_KEY_ALIAS, encryptionKey, {
        service: KEYCHAIN_SERVICE,
      });
    }

    // Create and return MMKV instance with the encryption key
    return new MMKV({
      id: STORAGE_ID,
      encryptionKey,
    });
  } catch (error) {
    console.error('Failed to initialize secure storage:', error);
    // Fallback to non-encrypted storage if keychain access fails
    return new MMKV({
      id: STORAGE_ID,
    });
  }
};

// Initialize storage asynchronously
const storagePromise = initializeSecureStorage();
let storage: MMKV | null = null;

// Ensure storage is initialized before any operation
const getStorage = async (): Promise<MMKV> => {
  if (!storage) {
    storage = await storagePromise;
  }
  return storage;
};

const validateKey = (key: string): void => {
  if (!key || typeof key !== 'string' || key.trim() === '') {
    throw new Error('Invalid key input');
  }
};

const setMapAsync = async (
  key: string,
  map: Record<string, unknown> | null,
): Promise<boolean> => {
  try {
    validateKey(key);
    if (map == null) {
      throw new Error('Invalid map input');
    }
    const jsonMap: string = JSON.stringify(map);
    const mmkv = await getStorage();
    mmkv.set(key, jsonMap);
    return true;
  } catch (error) {
    console.error(`Failed to set map for key "${key}":`, error);
    throw error;
  }
};

const getMapAsync = async (
  key: string,
): Promise<Record<string, unknown> | null> => {
  try {
    validateKey(key);
    const mmkv = await getStorage();
    const jsonMap: string | undefined = mmkv.getString(key);
    if (jsonMap == null) {
      return null;
    }
    return JSON.parse(jsonMap);
  } catch (error) {
    console.error(`Failed to get map for key "${key}":`, error);
    throw error;
  }
};

const setStringAsync = async (
  key: string,
  string: string | null | undefined,
): Promise<boolean> => {
  try {
    validateKey(key);
    if (string == null) {
      throw new Error('Invalid string input');
    }
    const mmkv = await getStorage();
    mmkv.set(key, string);
    return true;
  } catch (error) {
    console.error(`Failed to set string for key "${key}":`, error);
    throw error;
  }
};

const getStringAsync = async (key: string): Promise<string | null> => {
  try {
    validateKey(key);
    const mmkv = await getStorage();
    return mmkv.getString(key) ?? null;
  } catch (error) {
    console.error(`Failed to get string for key "${key}":`, error);
    throw error;
  }
};

const setBoolAsync = async (key: string, value: boolean): Promise<boolean> => {
  try {
    validateKey(key);
    const mmkv = await getStorage();
    mmkv.set(key, value);
    return true;
  } catch (error) {
    console.error(`Failed to set boolean for key "${key}":`, error);
    throw error;
  }
};

const getBoolAsync = async (key: string): Promise<boolean | null> => {
  try {
    validateKey(key);
    const mmkv = await getStorage();
    const value: boolean | undefined = mmkv.getBoolean(key);
    return value ?? null;
  } catch (error) {
    console.error(`Failed to get boolean for key "${key}":`, error);
    throw error;
  }
};

const removeItem = async (key: string): Promise<boolean> => {
  try {
    validateKey(key);
    const mmkv = await getStorage();
    mmkv.delete(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove item for key "${key}":`, error);
    throw error;
  }
};

export {
  getBoolAsync,
  getMapAsync,
  getStringAsync,
  removeItem,
  setBoolAsync,
  setMapAsync,
  setStringAsync,
};
