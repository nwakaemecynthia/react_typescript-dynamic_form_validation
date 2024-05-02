import { FormTypes, IFormProps } from "../utils/types";
import { TEXT } from "./forms/TEXT";
import {DATE} from "./forms/DATE";
import {EMAIL} from "./forms/EMAIL";
import {NUMBER} from "./forms/NUMBER";


const DynamicFields = ({divClass, inputClass, formControl, formHook}: IFormProps) => {
  console.log(divClass, inputClass, formControl, formHook)
	switch(formControl["type"]) {
		case FormTypes.text:
			return TEXT({divClass, inputClass, formControl, formHook});
		case FormTypes.email:
			return EMAIL({divClass, inputClass, formControl, formHook});
		case FormTypes.number:
			return NUMBER({divClass, inputClass, formControl, formHook});
		case FormTypes.date:
			return DATE({ divClass, inputClass, formControl, formHook });
	// 		/*
  //       Create as many custom input/Select/TextArea component as possible, inline with INPUTTYPE CONSTANTS
  //     */

		default:
			return null
	}
}

export default DynamicFields;