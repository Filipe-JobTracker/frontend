import {useCallback, useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CompanyInput from "./CompanyInput.tsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import AppliedAtPicker from "./DatePicker.tsx";
import {useGlobalState} from "../../AppContext.tsx";
import {Company} from "../../types.ts";

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 720,
    bgcolor: 'background.paper',
    border: '1.25px solid #1f1f1f',
    borderRadius: '15px',
    boxShadow: 12,
    py: 4,
    px: 2,
};


const ModalHeader = () => {
    return (<>
        <Typography sx={{
            my: 2, ml: 1, fontSize: '1.5rem', fontWeight: 'bold'
        }}>
            Add a new Application
        </Typography>
        <Divider sx={{
            mt: 2, mb: 3, width: '100%'
        }}/>
    </>);
}


export default function NewApplicationModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [companyInput, setCompanyInput] = useState<string>("");
    const [company, setCompany] = useState<Company | null>(null);
    const [position, setPosition] = useState('');
    const [link, setLink] = useState('');
    const [appliedAt, setAppliedAt] = useState<Dayjs>(dayjs(Date.now()));
    const {addApplication, companies} = useGlobalState();
    const [companyError, setCompanyError] = useState(false);
    const [positionError, setPositionError] = useState(false);
    const [linkError, setLinkError] = useState(false);

    const handleSave = useCallback(async () => {
        if (company && position && link && appliedAt) {
            const applicationForm = {
                name: position,
                company: company as Company,
                link: link,
                appliedAt: appliedAt.toDate(),
            };
            const newApplication = await addApplication(applicationForm);
            if (!newApplication) {
                console.log("error!")
                return;
            }
            handleClose();
            setCompany(null);
            setCompanyInput("");
            setPosition('');
            setLink('');
            setAppliedAt(dayjs(Date.now()));
            console.log("success!")
            // Display a success message (optional)
        } else {
            if (!company) {
                setCompanyError(true);
            }
            if (!position) {
                setPositionError(true);
            }
            if (!link) {
                setLinkError(true);
            }
            console.log("fuck!")
            // Handle validation errors (optional)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company, position, link, appliedAt, addApplication, companies]);


    return (<div>
        <Button onClick={handleOpen} variant="contained" color="success"
                sx={{
                    mb: 1, width: "100%",
                }}>
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', width: '100%'
            }}>
                New
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <AddCircleRoundedIcon/>
                </Box>
            </Box>
        </Button>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ModalHeader/>
                <Box sx={{
                    width: "100%", px: 1,
                }}>
                    <CompanyInput updateFormValue={setCompanyInput}
                                  inputValue={companyInput}
                                  company={company}
                                  updateCompanyValue={setCompany}
                                  validInput={companyError}
                                    updateValidInput={setCompanyError}/>
                    <TextField id="position"
                               label="Position Name"
                               variant="outlined"
                               value={position}
                               error={positionError}
                               required
                               onChange={(e) => {
                                   if (positionError)
                                       setPositionError(false);
                                   setPosition(e.target.value)
                               }}
                               onBlur={() => {
                                   if ((position || position.length > 1) && positionError)
                                       setPositionError(false);
                                   else
                                       setPositionError(true);
                               }}
                               sx={{
                                   my: 2, width: "100%",
                               }}/>
                    <TextField id="link"
                               required
                               label="Link"
                               variant="outlined"
                               value={link}
                               error={linkError}
                               onChange={(e) => {
                                   if (linkError)
                                       setLinkError(false);
                                   setLink(e.target.value)
                               }}
                               helperText="Incorrect entry."
                               onBlur={() => {
                                   if ((link || link.length > 1) && linkError)
                                       setLinkError(false);
                                   else
                                       setLinkError(true);
                               }}
                               sx={{
                                   my: 2, width: "100%",
                               }}/>
                    <AppliedAtPicker value={appliedAt}
                                     onChange={setAppliedAt}/>
                </Box>
                <Divider sx={{
                    mt: 2, mb: 3, width: '100%',
                }}/>
                <Box sx={{
                    display: "flex", justifyContent: "flex-end"
                }}>
                    <Button variant="contained" color="error"
                            onClick={handleClose} sx={{
                        mx: 1, px: 2.5, py: 1.2,
                    }}>Close</Button>
                    <Button variant="contained" color="success"
                            onClick={handleSave} sx={{
                        mx: 1, px: 2.5, py: 1.2,
                    }}>Save</Button>
                </Box>
            </Box>
        </Modal>
    </div>);
}
