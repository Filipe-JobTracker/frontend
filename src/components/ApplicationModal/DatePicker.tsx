import {Dispatch, SetStateAction} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

interface DatePickerProps {
    value: Dayjs | null;
    onChange: Dispatch<SetStateAction<Dayjs>>;
}

export default function AppliedAtPicker({value, onChange}: DatePickerProps) {
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Applied at"
                value={value}
                onChange={(newval) => {
                    onChange(newval ? newval : value ? value : dayjs(Date.now()))
                }}
                sx={{
                    width: "100%",
                }}
            />
        </LocalizationProvider>);
}