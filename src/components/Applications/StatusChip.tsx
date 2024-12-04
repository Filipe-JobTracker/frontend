import Chip from "@mui/material/Chip";
import {SyntheticEvent, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {visuallyHidden} from '@mui/utils';
import FormControl from '@mui/material/FormControl';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import Select, {
    SelectChangeEvent,
} from '@mui/material/Select';
import {MenuItem} from "@mui/material";
import {ApplicationStatus} from "../../types.ts";
import {useGlobalState} from "../../GlobalState.tsx";

interface ChipProps {
    status: ApplicationStatus;
    id: string;
    active: boolean;
}

const getChipColor = (status: ApplicationStatus) => {
    switch (status) {
        case ApplicationStatus.APPLIED:
            return "primary";
        case ApplicationStatus.INTERVIEW:
            return "secondary";
        case ApplicationStatus.CALLED:
            return "warning";
        case ApplicationStatus.ACCEPTED:
        case ApplicationStatus.OFFER:
            return "success";
        case ApplicationStatus.GHOSTED:
        case ApplicationStatus.REJECTED:
            return "error";
        default:
            return "default";
    }
}

export default function StatusChip({status, id, active}: ChipProps) {
    const [open, setOpen] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>(status);
    const {updateApplication} = useGlobalState();
    const handleChange = (event: SelectChangeEvent<typeof open>) => {
        setApplicationStatus(typeof event.target.value === 'string' ? event.target.value as ApplicationStatus : ApplicationStatus.APPLIED);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = (_event: SyntheticEvent<unknown> | null, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };
    const handleSave = (form : ChipProps) => {
        updateApplication(form).catch(e => console.error(e));
        handleClose(null, undefined);
    }

    return (
        <>
            <Chip label={status} color={getChipColor(status)} onClick={() => handleOpen()}/>
            <Dialog disableEscapeKeyDown open={open} onClose={(e, r) => handleClose(e as SyntheticEvent<unknown> | null, r)}>
                <DialogTitle>Status of Application</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseRoundedIcon />
                </IconButton>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl variant="filled" sx={{ m: 1.5, minWidth: 420 }}>
                            <InputLabel htmlFor="updading-changing" sx={visuallyHidden}>Application Status</InputLabel>
                            <Select
                                onChange={handleChange}
                                input={<OutlinedInput label="Status" id="change-me" />}
                                notched={false}
                                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                value={applicationStatus}
                            >
                                <MenuItem value={ApplicationStatus.APPLIED}>Applied</MenuItem>
                                <MenuItem value={ApplicationStatus.REJECTED}>Rejected</MenuItem>
                                <MenuItem value={ApplicationStatus.GHOSTED}>Ghosted</MenuItem>
                                <MenuItem value={ApplicationStatus.OFFER}>Offer</MenuItem>
                                <MenuItem value={ApplicationStatus.CALLED}>Called</MenuItem>
                                <MenuItem value={ApplicationStatus.ACCEPTED}>Accepted</MenuItem>
                                <MenuItem value={ApplicationStatus.INTERVIEW}>Interview</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{
                    py: 2
                }}>
                    <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
                    <Button onClick={() => handleSave({status: applicationStatus, id, active})} variant="contained" color="success">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}