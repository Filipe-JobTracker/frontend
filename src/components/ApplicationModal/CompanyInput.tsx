import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {useGlobalState} from "../../AppContext.tsx";
import {KeyboardEvent, Dispatch, SetStateAction} from "react";
import {Company} from "../../types.ts";

interface CompanyInputProps {
    inputValue: string;
    updateFormValue: Dispatch<SetStateAction<string>>;
    company: Company | null;
    updateCompanyValue: Dispatch<SetStateAction<Company | null>>;
    validInput: boolean;
    updateValidInput: Dispatch<SetStateAction<boolean>>;
}

const filter = createFilterOptions<string>();

export default function CompanyInput({
                                         updateFormValue,
                                         inputValue,
                                         company,
                                         updateCompanyValue,
                                         validInput,
                                         updateValidInput,
                                     }: CompanyInputProps) {

    const {companies, addCompany} = useGlobalState();

    const filteredCompanies = companies.map((company: Company) => company.name);

    const handleCreateCompany = async (name: string) => {
        const newCompany = await addCompany(name);
        updateFormValue(newCompany.name);
        return newCompany;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && inputValue) {
            if (!company) {
                if (!companies.some((c: Company) => c.name === inputValue)) {
                    handleCreateCompany(inputValue).catch((e) => {
                        console.error(e);
                    });
                } else {
                    updateCompanyValue(companies.filter((c: Company) => c.name === inputValue)[0]);
                }
            }
        }
    }
    return (<Autocomplete
        value={inputValue}
        onChange={(_event, newValue) => {
            if (validInput) updateValidInput(false);
            if (newValue && typeof newValue === 'string') {
                updateFormValue(newValue)
            } else {
                updateFormValue("");
            }
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
            if (validInput) updateValidInput(false);
            updateFormValue(newInputValue);
        }}
        selectOnFocus
        clearOnBlur
        freeSolo
        disablePortal
        options={filteredCompanies}
        id="company-input"
        filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== '' && !isExisting) {
                filtered.push(`Press Enter to add ${inputValue as string}`);
            }

            return filtered;
        }}
        onBlur={() => {
            if ((inputValue || inputValue.length > 1) && validInput) {
                updateValidInput(false);
            } else {
                updateValidInput(true);
            }
            if (inputValue && (!company || inputValue !== company?.name)) {
                if (!companies.some((c: Company) => c.name === inputValue)) {
                    handleCreateCompany(inputValue).then((c) => {
                        updateCompanyValue(c);
                        updateFormValue(c.name);
                    }).catch((e) => {
                        console.error(e);
                    });
                } else {
                    updateCompanyValue(companies.filter((c: Company) => c.name === inputValue)[0]);
                }
            } else {
                console.error("ai o crl");
            }
        }}
        getOptionLabel={(option) => {
            if (typeof option === 'string') {
                return option;
            }
            if (option) {
                console.log(typeof option);
                console.log(option);
                return option;
            }
            return "Nothing added";
        }}
        renderOption={(props, option) => {
            const {key, ...optionProps} = props;
            return (<li key={key} {...optionProps}>
                {option}
            </li>);
        }}
        sx={{width: "100%", pb: 2}}
        renderInput={(params) => (<TextField {...params}
                                             onKeyDown={handleKeyDown}
                                             label="Company"/>)}
    />);
}