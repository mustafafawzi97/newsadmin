import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Articles {
    id: number;
    title: string;
    content: string;
    image: string;
    date: string;
}
