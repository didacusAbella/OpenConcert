import { Component, OnInit } from "@angular/core";
import { LocaleService } from 'src/app/shared/services/locale.service';
import { Locale } from 'src/app/shared/models/locale';

@Component({
  selector: 'app-locales',
  templateUrl: './locale.component.html',
  host: { 'class': 'p-col-8'}
})
export class LocaleComponent implements OnInit {

  public locales: Locale[];

  constructor(private localeService: LocaleService) {

  }

  ngOnInit(): void {
    this.localeService.getLocales().subscribe(loc => this.locales = loc);
  }


 }