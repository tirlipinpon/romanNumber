import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { forbiddenNameValidator } from '../commons/validate-roman';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  registerForm: FormGroup;
  result: any;

  constructor(private formBuilder: FormBuilder){  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      roman: ['',[Validators.required, forbiddenNameValidator()]]
    });
    this.registerForm.valueChanges.subscribe(value => {
      // console.log(this.registerForm.controls["roman"].errors["forbiddenName2"].name);
      this.result = '';
    });
  }

  hasNumber(myString: string):boolean {
    return /\d/.test(myString);
  }

  convert(value: any):void {
    if( !isNaN(value)){
      // console.log('is a number');
      this.toRoman(value);
    }else  if( !this.hasNumber(value) ){
      // console.log('is a string');
      this.fromRoman(value);
    }else{
      // console.log('value not valid:'+value);
      // this.result = 'value not valid:' + value;
    }
  }

  fromRoman (str: string):void {
    // console.log(str);
    str = str.toUpperCase();

    let result = 0;
    let calcul = ''
    // the result is now a number, not a string
    let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let roman = ['M', 'CM','D','CD','C', 'XC', 'L', 'XL', 'X','IX','V','IV','I'];

    for (let i = 0;i<=decimal.length;i++) {
      while (str.indexOf(roman[i]) === 0){
        result += decimal[i];
        calcul += decimal[i]+'+';
        // console.log('result:'+result);

        str = str.replace(roman[i],'');
        // console.log('str:'+str);
      }
      // console.log('i:'+i);
    }
    // console.log(calcul.slice(0, -1));
    this.result = result;
  }
  toRoman(num: number) {
    let calcul = ''
    let result = '';
    let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
    for (let i = 0;i<=decimal.length;i++) {
      while (num%decimal[i] < num) {
        result += roman[i];
        num -= decimal[i];
      }
    }
    // console.log(calcul.slice(0, -1));
    this.result = result;
  }
}
