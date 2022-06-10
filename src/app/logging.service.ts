import { Injectable } from "@angular/core";
import { inject } from "@angular/core/testing";

//@Injectable({providedIn: 'root'})
export class LoggingService{
    lastlog: string;

    printLog(message: string){
        console.log(message);
        console.log(this.lastlog);
        this.lastlog = message;
    }
}