import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Articles {
    id: number;
    title: string;
    description: string;
    image: Blob;
    imgname: string;
}
