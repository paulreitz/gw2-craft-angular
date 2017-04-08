import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2DraggableModule } from 'ng2-draggable';

import { AppRoutingModule } from './core/app-routing.module';
import { LanguageService } from './services/language.service';
import { SearchService } from './services/search.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { DiagramComponent } from './components/diagram/diagram/diagram.component';
import { AboutComponent } from './components/about/about/about.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { SearchComponent } from './components/home/search/search.component';
import { DisplayComponent } from './components/home/display/display.component';
import { TileComponent } from './components/home/tile/tile.component';
import { PagerComponent } from './components/home/pager/pager.component';
import { TreeComponent } from './components/diagram/tree/tree.component';
import { ListComponent } from './components/diagram/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiagramComponent,
    AboutComponent,
    HeaderComponent,
    NavigationComponent,
    SearchComponent,
    DisplayComponent,
    TileComponent,
    PagerComponent,
    TreeComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2DraggableModule
  ],
  providers: [
    LanguageService,
    SearchService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
