import { ValidatorFn, AbstractControl } from '@angular/forms';

export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    // console.log('name:'+name);

    if(name){
      const asNumber =  /\d/.test(name);
      const asChar = /[a-zA-Z]+/g.test(name);
      const asZero = /[0]+/g.test(name);
      let responseError: string;

      console.log('name:'+name+' asNumber:'+asNumber+' asChar:'+asChar+' asZero:'+asZero);

      if(asNumber && asZero){
        responseError = 'Zero not allowed!';
        return {['forbidden']: {responseError}};
      }else if(asChar && !asNumber){
        let asRoman = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(name);
        console.log('asNonRoman:'+asRoman);
        responseError = "Non roman char!";
        return !asRoman ? {'forbidden': {responseError}} : null;
      }else{
        responseError = "Don't mix number and text!";
        return asNumber && asChar ? {'forbidden': {responseError}} : null;
      }
    }
    return null;
  };
}
