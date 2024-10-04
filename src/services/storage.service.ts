import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  write(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  isLogged(): boolean {
    return localStorage.getItem("id") !== null;
  }
}
