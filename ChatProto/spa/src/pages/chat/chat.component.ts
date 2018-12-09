import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as signalR from '@aspnet/signalr';

export interface IChatMessage 
{
    fullName: string;
    message: string;
}

@Component({
    selector: 'page-chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit
{
    roomName: string;
    fullName: string;
    _hub: signalR.HubConnection;
    messages: Array<IChatMessage> = [];
    currentMessage: string = '';


    constructor(private route: ActivatedRoute) {

    }

    sendMessage() {
        this._hub.send('SendMessage', this.roomName, this.fullName, this.currentMessage);
        this.currentMessage = '';
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
           this.roomName = params['room']; 
           this.fullName = params['name']; 

           this._hub = new signalR.HubConnectionBuilder()
                .withUrl("/chatHub")
                .build();

            this._hub.on('ReceiveMessage', (fullName: string, message: string) => {
                this.messages.push({
                    fullName: fullName,
                    message: message
                });
            });
           
            this._hub.start()
                .then(() => {
                    this._hub.invoke("join", this.roomName, this.fullName);
                });
           
        });
    }
}