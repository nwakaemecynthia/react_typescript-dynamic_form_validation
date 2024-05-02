export enum FormTypes {
  text = 'text',
  email = 'email',
  number = 'number',
  radio = 'radio',
  checkbox = 'checkbox',
  select = 'select',
  file = 'file',
  date ='date',
}

export interface FormModel {
  [key: string]: number | string | boolean | Date | Object | [];
}

interface Options {
  label: string,
  value: string | number | boolean
}

export interface DynamicFieldModel {
  key: string,
  name: string,
  type: FormTypes,
  label: string,
  options: Options[],
  required: boolean,
  hidden?: boolean,
  maximum: number | string | Date,
  minimum: number | string | Date,
  placeholder: string,
  default_value: number | string | Date | boolean ,
}

export interface IFormProps {
  divClass: string,
  inputClass: string,
  formControl: DynamicFieldModel,
  formHook: any
};