import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Injectable()
export class ProfileService {

  public loadCities(): SelectItem[] {
    return [
      { label: "Napoli", value: "Napoli"},
      { label: "Salerno", value: "Salerno"},
      { label: "Caserta", value: "Caserta" },
      { label: "Benevento", value: "Benevento" }
    ]
  }

  public loadGenres(): SelectItem[] {
    return [
      { label: "Rock", value: "Rock" },
      { label: "Metal", value: "Metal" },
      { label: "Pop", value: "Pop" }
    ];
  }
}