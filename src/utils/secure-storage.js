import { EncryptStorage } from "encrypt-storage";

// const encryptStorage = new EncryptStorage(process.env.SECRET_KEY, options);
export const encryptStorage = new EncryptStorage("secret-key-value", {
  prefix: "@rj",
  stateManagementUse: true,
  encAlgorithm: "Rabbit",
});

export const getLoalStorageItem = (key) => {
  const value = encryptStorage.getItem(key);
  const isJson = isValidJson(value);

  if (isJson) {
    return JSON.parse(value);
  }

  return value;
};

export const setLoalStorageItem = (key, json) => {
  const jsonString = JSON.stringify(json);
  encryptStorage.setItem(key, jsonString);
};

export const isValidJson = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
};
