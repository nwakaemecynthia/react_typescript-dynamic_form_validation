import {useMemo, useState} from "react";
import {ErrorMessage} from "@hookform/error-message";
import { IFormProps } from "../../utils/types";

export const EMAIL = ({divClass, inputClass, formControl, formHook}: IFormProps) => {
	const [validatorSchema, setValidatorSchema] = useState({});
	const errors = formHook.formState.errors || formHook.formState.errors[formControl["key"]];

	useMemo(() => {
		for(const [key, value] of Object.entries(formControl)) {
			switch(key) {
				case 'required':
					if(value) setValidatorSchema(prevState => ({...prevState, required: `${formControl["label"]} is required.`}));
					break;
				default:
					break;
			}
		}

		const pattern = {
			value: /\S+@\S+\.\S+/,
			message: `${formControl["label"]} is invalid.`
		};
		setValidatorSchema(prevState => ({...prevState, pattern}));
	}, []);


	return (
		<div className={divClass}>
			<label htmlFor={formControl["name"]} className="form-label">
				{formControl["label"]} {formControl["required"] && <span className="text-danger">*</span>}
			</label>
			<input className={inputClass}
						 type={formControl["type"]}
						 name={formControl["name"]}
						 placeholder={formControl["placeholder"]}
						 defaultValue={formControl["default_value"]}
						 {...formHook.register(formControl["name"], {
							 ...validatorSchema
						 })}
			/>
			<ErrorMessage
				errors={errors}
				name={formControl["name"]}
				render={(error) =>
					error &&
					Object.entries(error).map(([type, message]: any) => (
						<small key={type} className="text-danger">{message}</small>
					))
				}
			/>
		</div>
	)
}
