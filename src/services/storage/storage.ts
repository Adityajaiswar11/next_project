import { STORAGE_KEYS } from "@/config/storage.config";

class StorageService {
  setRawData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getRawData(key: string) {
    return JSON.parse(localStorage.getItem(key) || "{}");
  }

  removeRawData(key: string) {
    localStorage.removeItem(key);
  }

  setUser(user: any) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getUser<T>() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? (JSON.parse(user) as T) : null;
  }

  removeUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  setAccessToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  getAccessToken() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  removeAccessToken() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  clearAuth() {
    this.removeUser();
    this.removeAccessToken();
  }
}

export const storageService = new StorageService();
