import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from 'src/pages/chat/chat.component';
import { HomeComponent } from 'src/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chat/:name/:room', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
