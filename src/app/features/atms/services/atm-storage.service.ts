import { Injectable } from "@angular/core";
import { Atm } from "../models/atm.model";

@Injectable({ providedIn: 'root' })
export class AtmStorageService {
    private key = 'ATMS';

    saveLocalStorage(atms: Atm[]) {
        localStorage.setItem(this.key, JSON.stringify(atms));
    }

    loadLocalStorage(): Atm[] | null {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    }

    clearLocalStorage() {
        localStorage.removeItem(this.key);
    }
}