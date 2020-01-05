import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_CONFIG } from './local-storage-config';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  clear() {
    const keys = Object.keys(window.localStorage).filter(key => key.includes(LOCAL_STORAGE_CONFIG.prependKey));
    keys.forEach(key => {
      window.localStorage.removeItem(key);
    });
  }
  remove(key: string) {
    key = `${LOCAL_STORAGE_CONFIG.prependKey}${key}`;
    window.localStorage.removeItem(key);
  }
  setItem(key: string, value: any) {
    key = `${LOCAL_STORAGE_CONFIG.prependKey}${key}`;
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
  }
  getItem(key: string): any {
    key = `${LOCAL_STORAGE_CONFIG.prependKey}${key}`;
    let value = window.localStorage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (e) {
      value = value;
    }
    return value;
  }
}
