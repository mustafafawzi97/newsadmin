import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Notify {
    id: number;
    title: string;
    content: string;
    date: string;
}
