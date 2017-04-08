import { Component, OnInit } from '@angular/core';
import { LanguageService } from "../../../services/language.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = "";

  constructor(private resx: LanguageService) {}

  ngOnInit() {
    this.title = this.resx.getString("app-title");
  }

}
