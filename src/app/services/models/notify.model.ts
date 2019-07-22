import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Notify {
    id: number;
    subject: string;
    content: string;
    date: string;
}
