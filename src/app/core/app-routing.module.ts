import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { CommonModule }             from '@angular/common';

import { HomeComponent }            from '../components/home/home/home.component';
import { DiagramComponent }         from '../components/diagram/diagram/diagram.component';
import { AboutComponent }           from '../components/about/about/about.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'diagram/:id', component: DiagramComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
}