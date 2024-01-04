export interface IInputValueToFill {
  id: string,
  value: string
  type: string
}

export interface IInputInfo {
  name: string
  label: string
  placeholder: string
  type: string
  id: string
  ariaLabel: string
  ariaLabelledBy: string
  options?: ISelectOption[]
}

export interface ISelectOption {
  value: string
  text: string
}

export const SelectElementType = 'SelectElementType'