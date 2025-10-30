import { Component } from '@angular/core';
import { DrinkapiService } from '../shared/drinkapi.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent {

  drinkForm!: any;
  drinks: any;
  addMode=true;

  constructor(private api: DrinkapiService, private build:FormBuilder){}

  ngOnInit() {
    this.getDrinks();
    this.drinkForm = this.build.group({
      id: [''],
      price: [''],
      drink: [''],
      amount: [''],
      type: [''],
      package: ['']
    })
  }

  save(){
    console.log("Mentés árnyékeljárás...")
    console.log(this.drinkForm.value);
    this.api.createDrink$(this.drinkForm.value).subscribe({
      next: (result) => {
        console.log(result);
        this.drinkForm.reset();
        this.getDrinks();
      }
    })
  }

  getDrinks() {
    this.api.getDrinks$().subscribe({
      next: (result: any) => {
        console.log(result.data);
        this.drinks = result.data;
      },
      error: () => {}
    })
  }
}
