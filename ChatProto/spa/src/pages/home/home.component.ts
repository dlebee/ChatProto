import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'page-home',
    templateUrl: './home.component.html'
})
export class HomeComponent
{
    channelName: string = '';
    fullName: string = '';
    constructor(private router: Router) {

    }

    join() {
        this.router.navigate(['chat', this.fullName, this.channelName]);
    }
}