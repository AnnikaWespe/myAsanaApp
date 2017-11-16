import {Injectable} from '@angular/core';
import {INITIAL_ASANA_LIST} from "./asana.data";
import {Asana, AsanaBlock} from './asana.model';


@Injectable()
export class AsanaService {

  playedBefore: boolean;
  newAsanaArray: Asana[] = [];
  asanaBlock0 = new AsanaBlock([], 0);
  asanaBlock1 = new AsanaBlock([], 0.1); // around 6 minutes
  asanaBlock2 = new AsanaBlock([], 0.2); // around 12 minutes
  asanaBlock3 = new AsanaBlock([], 0.3); // around 18 minutes
  asanaBlock4 = new AsanaBlock([], 0.4); // around 24 minutes
  nowInHours: number;


  constructor() {
    this.playedBefore = (localStorage.getItem("playedBefore") === "true");
    this.nowInHours = new Date().getTime() / 3600000;
    if (!this.playedBefore) {
      this.initiateGame();
    }
    else {
      this.resumeGame()
    }
  }

  private initiateGame() {
    console.log("initiating game");
    this.playedBefore = true;
    localStorage.setItem("playedBefore", "true");
    this.newAsanaArray = INITIAL_ASANA_LIST;
    this.shuffleAll();
    this.asanaBlock0.asanaArray = this.newAsanaArray.splice(0, 8);
    this.updateLocalStorage();
  }

  private resumeGame() {
    console.log("resuming game");
    this.getDataFromLocalStorage();
    this.shuffleAll();
  }


  stillAsanaAvailable(){
    if(this.newAsanaArray.length + this.asanaBlock0.asanaArray.length + this.asanaBlock1.asanaArray.length + this.asanaBlock2.asanaArray.length + this.asanaBlock3.asanaArray.length + this.asanaBlock4.asanaArray.length === 0){
      return {stillAsanaAvailable: false,
              stillNewAsanaToAdd: false};
    }
    else {
      let stillNewAsanaToAdd = (this.newAsanaArray.length > 0);
      return {
        stillAsanaAvailable: true,
        stillNewAsanaToAdd: stillNewAsanaToAdd
      };
    }
  }

  addNewAsana(number) {
    let newAsanaForBlock0 = this.newAsanaArray.splice(0, number);
    Array.prototype.push.apply(this.asanaBlock0.asanaArray, newAsanaForBlock0);
    console.log(this.asanaBlock0);
    this.updateLocalStorage();
    return({asana: this.asanaBlock0.asanaArray[0], asanaBlockName: "asanaBlock0"})
  }

  resetGame() {
    localStorage.clear();
    this.initiateGame();
  }

  next(asanaBlockName?: string, knownByUser?: boolean) {
    if (asanaBlockName) {
      this.updateAsanaBlocksAccordingToUserAnswer(asanaBlockName, knownByUser)
    }
    for (let i = 4; i > -1; i--) {
      if (this.checkAgeAndIfNonEmpty(this['asanaBlock' + i])) {
        this.logAllArrays();
        return {
          asana: this['asanaBlock' + i].asanaArray[0],
          asanaBlockName: 'asanaBlock' + i
        };
      }
    }
    this.updateLocalStorage();
    this.logAllArrays();
  }

  private checkAgeAndIfNonEmpty(asanaBlock: AsanaBlock) {
    console.log("Zeitunterschied in Minuten", (this.nowInHours - asanaBlock.timeThenInHours)*60);
    if (asanaBlock.asanaArray.length && (this.nowInHours - asanaBlock.timeThenInHours) >= asanaBlock.repeatAfterTimeIntervalInHours) {
      return true;
    }
    else {
      return false;
    }
  }

  private updateAsanaBlocksAccordingToUserAnswer(asanaBlockName, knownByUser) {
    let asana = this[asanaBlockName].asanaArray.shift();
    let numberOfBlock = Number(asanaBlockName[10]);
    if (knownByUser && (numberOfBlock < 4)) {
        let block: AsanaBlock = this["asanaBlock" + (numberOfBlock + 1)];
        block.asanaArray.push(asana);
        block.timeThenInHours = this.nowInHours;
        console.log(this.nowInHours);
        console.log(block);
        }
    else if (numberOfBlock < 4){
        this.asanaBlock0.asanaArray.push(asana);
        }
    this.updateLocalStorage();
  }

  private shuffleAll() {
    for (let i = 0; i < 5; i++) {
      this.shuffle(this['asanaBlock' + i])
    }
    ;
    this.shuffle(this.newAsanaArray);
  }

  private shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private updateLocalStorage() {
    for (let i = 0; i < 5; i++) {
      localStorage.setItem('asanaBlock' + i, JSON.stringify(this['asanaBlock' + i]))
    }
    ;
    localStorage.setItem('newAsana', JSON.stringify(this.newAsanaArray))
  }

  private getDataFromLocalStorage() {
    this.newAsanaArray = JSON.parse(localStorage.getItem("newAsana"));
    this.asanaBlock0 = JSON.parse(localStorage.getItem("asanaBlock0"));
    this.asanaBlock1 = JSON.parse(localStorage.getItem("asanaBlock1"));
    this.asanaBlock2 = JSON.parse(localStorage.getItem("asanaBlock2"));
    this.asanaBlock3 = JSON.parse(localStorage.getItem("asanaBlock3"));
    this.asanaBlock4 = JSON.parse(localStorage.getItem("asanaBlock4"));
  }
  private logAllArrays(){
    console.log(this.newAsanaArray);
    console.log(this.asanaBlock0.asanaArray);
    console.log(this.asanaBlock1.asanaArray);
    console.log(this.asanaBlock2.asanaArray);
    console.log(this.asanaBlock3.asanaArray);
    console.log(this.asanaBlock4.asanaArray);
  }

}
