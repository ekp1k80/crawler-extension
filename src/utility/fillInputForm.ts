import { IInputValueToFill, IInputInfo, SelectElementType } from "../types/fillInputForm";

export function fillInputForm(values: IInputValueToFill[]) {
  values.forEach((inpt) => {
    const inputElement = document.getElementById(inpt.id)
    if(inputElement) {
      inputElement.setAttribute('value', inpt.value)
      if(inpt.type === SelectElementType) {
        const options = inputElement.getElementsByTagName('option')
        for(const option of options){
          option.removeAttribute('selected')
          if(option.value === inpt.value){
            option.setAttribute('selected', 'selected')
          }
        }
      }
    }
  })
}