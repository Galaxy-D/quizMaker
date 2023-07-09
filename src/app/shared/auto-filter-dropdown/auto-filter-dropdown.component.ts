import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ICategory } from 'src/app/shared/models';

@Component({
  selector: 'auto-filter-dropdown',
  templateUrl: './auto-filter-dropdown.component.html',
  styleUrls: ['./auto-filter-dropdown.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AutoFilterDropdownComponent implements OnInit {

  userChoice: string = '';
  isUserInputValid: boolean;

  //for the collection i suppose that data has the following generic shape {id:...,name:...}
  @Input() dataCollection: ICategory[];
  @Output() userSelectedChoice = new EventEmitter<ICategory>();

  @ViewChild('userChoiceRef') userChoiceRef: ElementRef;
  @ViewChild('dataListRef') dataListRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedItem(SelectedChoice: string):void{
    let natEl = this.dataListRef.nativeElement.querySelector("ul") as HTMLUListElement;
    let dataId = natEl?.dataset.value;
    this.userSelectedChoice.emit({id:+dataId,name:SelectedChoice});
  }

  filterDataBySearchTerm(searchTerm: string): string[] {
    let results: string[] = [];
    const val = searchTerm.toLowerCase();

    this.dataCollection.forEach(cat => {
      if (cat.name.toLowerCase().indexOf(val) > -1) {
        results.push(cat.name);
      }
    });
    return results;
  }

  handelFilteredData():void {
    let results: string[] = [];
    if (this.userChoice.length > 0) {
      results = this.filterDataBySearchTerm(this.userChoice);
    }
    this.displayCollection(results, this.userChoice);
  }

  displayCollection(results: string[], inputVal: string):void {

    let natEl = this.dataListRef.nativeElement.querySelector("ul") as HTMLUListElement;

    if (inputVal != '' && results.length > 0) {
      natEl.innerHTML = '';
      // Highlights only the first match substring for each item
      results.forEach(item => {
        let itemId: number;
        this.dataCollection
        .filter(el => results.includes(el.name))
        .forEach(el => {
          el.name == item ? itemId = el.id : ''
        });
        const match = item.match(new RegExp(inputVal, 'i'));
        item = item.replace(match[0], `<strong>${match[0]}</strong>`);
        natEl.innerHTML += `<li data-value='${itemId}'>${item}</li>`;
      })
      natEl.classList.add('has-dataList');
    } else if (inputVal == '' && results.length == 0){
      natEl.innerHTML = '';
      this.dataCollection.forEach(el => {
        natEl.innerHTML += `<li data-value='${el.id}'>${el.name}</li>`
      });
      natEl.classList.add('has-dataList');
    } else {
      results = [];
      natEl.innerHTML = '';
      natEl.classList.remove('has-dataList');
    }
  }

  getSelectedChoice($event) {
    this.userChoice = $event.target.innerText;
    this.userChoiceRef.nativeElement.focus();
    let natEl = this.dataListRef.nativeElement.querySelector("ul") as HTMLUListElement;
    natEl.innerHTML = '';
    natEl.classList.remove('has-dataList');

    let dataId = $event.target.dataset.value != undefined ? +$event.target.dataset.value : $event.target.dataset.value;
    this.userSelectedChoice.emit({id:isNaN(dataId) ? undefined : +dataId, name:this.userChoice});
  }

  handelUserInput(): void{
    this.isUserInputValid = this.dataCollection.some(cat => cat.name === this.userChoice);
    if (this.userChoice != '' && !this.isUserInputValid) {
      this.userChoice = '';
    }
  }

  displayAllChoice(){
    let natEl = this.dataListRef.nativeElement.querySelector("ul") as HTMLUListElement;
    if(this.userChoice == ''){
      let results: string[] = [];
      this.displayCollection(results,this.userChoice);
      natEl.classList.add('has-dataList');
    }
  }

  hideAllChoice(){
    let natEl = this.dataListRef.nativeElement.querySelector("ul") as HTMLUListElement;
    natEl.classList.remove('has-dataList');
  }

}


