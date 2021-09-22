import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Adventure } from 'src/app/interfaces/adventure';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  displayScene: Adventure;
  constructor(private dService: DataService) { }

  ngOnInit() {
    this.displayScene = this.dService.getFirstScene();
  }

  nextScene(id){
    if(this.displayScene.ending === true){

    }else{
      this.displayScene = this.dService.getNextScene(id);
    }
  }
}
