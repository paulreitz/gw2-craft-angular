import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navLinks:Array<{ label: string, route: string }>;

  constructor(private resx: LanguageService) {}

  ngOnInit() {
    this.navLinks = [];
    this.navLinks.push({label: this.resx.getString("nav-home"), route: "/home"});
    this.navLinks.push({label: this.resx.getString("nav-about"), route: "/about"});
  }

}
