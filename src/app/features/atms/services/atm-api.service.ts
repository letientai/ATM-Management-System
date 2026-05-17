import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Atm } from "../models/atm.model";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AtmService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = new URL('/v1', environment.apiUrl).toString();

    getATMs(): Observable<Atm[]> {
        return this.http.get<Atm[]>(`${this.baseUrl}/atm`);
    }

    getATMById(id: string): Observable<Atm> {
        return this.http.get<Atm>(`${this.baseUrl}/atm/${id}`);
    }

    createATM(atm: Omit<Atm, 'id' | 'createdAt'>): Observable<Atm> {
        return this.http.post<Atm>(`${this.baseUrl}/atm`, atm);
    }

    updateATM(id: string, atm: Partial<Omit<Atm, 'id' | 'createdAt'>>): Observable<Atm> {
        return this.http.put<Atm>(`${this.baseUrl}/atm/${id}`, atm);
    }

    deleteATM(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/atm/${id}`);
    }
}