import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adventure } from '../interfaces/adventure';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private url = 'https://spreadsheets.google.com/feeds/list/1vqcFoe5ff3ZHnCoxt64sqvau09xRMXRswqVXfNn9sA0/1/public/full?alt=json';
  private urlEnding = 'https://spreadsheets.google.com/feeds/list/1vqcFoe5ff3ZHnCoxt64sqvau09xRMXRswqVXfNn9sA0/2/public/full?alt=json';
  private googleSheet;
  private scenes: Adventure[] = [];
  private audio = new Audio();
  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.googleSheet = this.http.get(this.url);
    this.googleSheet.subscribe(
      x => {
        console.log(x);
        for (const s of x.feed.entry) {
          const info: Adventure = {
            id: s.gsx$id.$t as number,
            scene: s.gsx$scene.$t,
            choice1: s.gsx$choice1.$t,
            choice2: s.gsx$choice2.$t,
            pChoice1: s.gsx$pchoice1.$t,
            pChoice2: s.gsx$pchoice2.$t,
            ending: s.gsx$ending.$t as boolean
          };
          this.scenes.push(info);
        }
      }
    );
  }

  //Get next scene by the value being passed into the function
  getNextScene(id: number): Adventure {
    return this.scenes[id - 1];
  }

  getFirstScene(): Adventure {
    return this.scenes[0];
  }

  playMusic(){
    this.audio.src = '/assets/route30.wav';
  }
}
