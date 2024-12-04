import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import {ChangeEvent} from "react";
import Papa from "papaparse";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ApplicationForm } from "../../types";
import {useGlobalState} from "../../GlobalState.tsx";

// Extend dayjs with customParseFormat plugin
dayjs.extend(customParseFormat);

export default function ImportCSV() {
    const { addApplication, companies, addCompany } = useGlobalState();
    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: async (results) => {
                    const data = results.data as any[];
                    console.log(data);
                    const mappedData = await Promise.all(data.map(async (row) => {
                        // console.log(new Date(row.Date));
                        const parsedDate = dayjs(row.Date, "DD/MM/YYYY").toDate();
                        // console.log(parsedDate);
                        let company = companies.find(c => c.name === row.Company);
                        if (!company) {
                            company = await addCompany(row.Company);
                        }
                        return {
                            name: row.Position,
                            appliedAt: parsedDate,
                            company,
                            link: row.Link,
                        } as ApplicationForm;
                    }));
                    // setApplications(mappedData);
                    mappedData.forEach(app => addApplication(app));
                    console.log(mappedData);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                },
            });
        }
    };
    return (<Box sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        gap: 2,
    }}>
        <Button component="label" variant="contained" color="success" sx={{
            width: "100%", my: 1,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                CSV
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <FileUploadRoundedIcon/>
                </Box>
            </Box>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                hidden
            />
        </Button>
        <Button component="label" variant="contained" color="success" sx={{
            width: "100%", my: 1,
        }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                }}>
                    CSV
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <FileDownloadRoundedIcon/>
                    </Box>
                </Box>
            </Button>
        </Box>);
}