import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Atm } from "../models/atm.model";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AtmService {
    private readonly http = inject(HttpClient);

    getATMs(): Observable<Atm[]> {
        return this.http.get<Atm[]>('/atm');
    }

    createATM(atm: Omit<Atm, 'id' | 'createdAt'>): Observable<Atm> {
        return this.http.post<Atm>('/atm', atm);
    }

    updateATM(id: string, atm: Partial<Omit<Atm, 'id' | 'createdAt'>>): Observable<Atm> {
        return this.http.put<Atm>(`/atm/${id}`, atm);
    }

    deleteATM(id: string): Observable<any> {
        return this.http.delete(`/atm/${id}`);
    }
}