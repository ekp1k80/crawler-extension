import { IInputInfo, ISelectOption, SelectElementType } from "../types/fillInputForm";


function getOptionsFromSelectElement (inputSelect: HTMLSelectElement): ISelectOption[] {
  const optionsElements = inputSelect.getElementsByTagName('option')
  const options: ISelectOption[] = []
  for(const optionElement of optionsElements){
    const value = optionElement.getAttribute('value')
    const text = optionElement.innerText
    options.push({
      value,
      text
    })
  }
  return options
}

function getDataFromSelectElement(inputSelect, index): IInputInfo {
  if(typeof inputSelect.getAttribute === "function") {
    const type = SelectElementType

    // Genera un ID único para el elemento <input>.
    const uniqueId = `select_${index}_${Date.now()}`;

    // Asigna el ID al elemento <input>.
    inputSelect.id = uniqueId;

    const name = inputSelect.getAttribute('name');
    const label = findLabelForInput(inputSelect);
    const placeholder = inputSelect.getAttribute('placeholder');
    const ariaLabel = inputSelect.getAttribute('aria-label')
    const ariaLabelledBy = inputSelect.getAttribute('aria-labelledby')
    const options = getOptionsFromSelectElement(inputSelect)
    return {
      name: name,
      label: label,
      placeholder: placeholder,
      type: type,
      id: uniqueId,
      ariaLabel,
      ariaLabelledBy,
      options
    };
  }
}

function getDataFromInputElement(input, index): IInputInfo {
  if(typeof input.getAttribute === "function") {
    const type = input.getAttribute('type')

    // Genera un ID único para el elemento <input>.
    const uniqueId = `input_${index}_${Date.now()}`;

    // Asigna el ID al elemento <input>.
    input.id = uniqueId;

    const name = input.getAttribute('name');
    const label = findLabelForInput(input);
    const placeholder = input.getAttribute('placeholder');
    const ariaLabel = input.getAttribute('aria-label')
    const ariaLabelledBy = input.getAttribute('aria-labelledby')

    return {
      name: name,
      label: label,
      placeholder: placeholder,
      type: type,
      id: uniqueId,
      ariaLabel,
      ariaLabelledBy
    };
  }
}

export function getInputInfoFromElement(element): IInputInfo[] {
  const inputInfo: IInputInfo[] = [];
  const inputElements = element.querySelectorAll('input');
  const inputSelectElements = element.querySelectorAll('select');

  console.log("inputSelectElements")
  console.log(inputSelectElements)

  for(const index in inputElements){
    const input = getDataFromInputElement(inputElements[index], index)
    if(input){
      inputInfo.push(input)
    }
  }
  for(const index in inputSelectElements){
    const inputSelect = getDataFromSelectElement(inputSelectElements[index], index)
    if(inputSelect){
      inputInfo.push(inputSelect)
    }
  }
  return inputInfo;
}
  
  function findLabelForInput(input) {
    // Buscar el label asociado al input
    const name = input.getAttribute('name');
    if (name) {
      const label = document.querySelector(`label[for="${name}"]`);
      if (label) {
        return label.textContent;
      }
    }
  
    // Si no se encuentra un label asociado al input, buscar un label anidado
    let parentElement = input.parentElement;
    while (parentElement) {
      if (parentElement.tagName === 'LABEL') {
        return parentElement.textContent;
      }
      parentElement = parentElement.parentElement;
    }
  
    // Si no se encuentra ningún label asociado, devuelve una cadena vacía
    return '';
  }
  