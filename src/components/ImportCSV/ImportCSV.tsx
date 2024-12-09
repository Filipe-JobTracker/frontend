import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import {ChangeEvent} from "react";
import Papa from "papaparse";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {ApplicationForm, ApplicationStatus} from "../../types";
import {useGlobalState} from "../../GlobalState.tsx";

interface ApplicationsToUpdateForm {
    status: ApplicationStatus;
    active: boolean;
    link: string;
}

// Extend dayjs with customParseFormat plugin
dayjs.extend(customParseFormat);

export default function ImportCSV() {
    const {applications: applicationStateArr, addApplication, companies, addCompany, updateApplication, fetchData} = useGlobalState();
    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: async (results) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = (results.data as any[]).filter(row => Object.values(row).some(value => (value as string).trim() !== ""));
                    const newCompanies = new Set<string>();
                    const applications: ApplicationForm[] = [];
                    const applicationsToChange: ApplicationsToUpdateForm[] = [];

                    for (const row of data) {
                        let parsedDate = dayjs(row.Date, "DD/MM/YYYY", true);
                        if (parsedDate.toString() === 'Invalid Date') {
                            parsedDate = dayjs(row.Date, "D/MM/YYYY", true);
                        }

                        if (!companies.some(c => c.name === row.Company)) {
                            newCompanies.add(row.Company);
                        }
                        const temp = {
                            name: row.Position,
                            appliedAt: parsedDate.toDate(),
                            company: {id: "", name: row.Company}, // Temporary company object
                            link: row.Link,
                        };
                        applications.push(temp);
                        if (row.Called.length > 0) {
                            applicationsToChange.push({
                                status: ApplicationStatus.TECHNICAL_TEST,
                                link: temp.link,
                                active: true,
                            });
                        }
                        if (row.Ghosted.length > 0) {
                            applicationsToChange.push({
                                status: ApplicationStatus.REJECTED,
                                link: temp.link,
                                active: false,
                            });
                        }
                    }

                    for (const companyName of newCompanies) {
                        try {
                            const newCompany = await addCompany(companyName);
                            companies.push(newCompany); // Update local companies list
                        } catch (error) {
                            console.error(`Error adding company ${companyName}:`, error);
                        }
                    }


                    for (const app of applications) {
                        const company = companies.find(c => c.name === app.company.name);
                        if (company) {
                            app.company = company; // Update company object with actual data
                            try {
                                const application = await addApplication(app);
                                applicationStateArr.push(application);
                            } catch (error) {
                                console.error(`Error adding application for ${app.name}:`, error);
                            }
                        } else {
                            console.error(`Company not found for application:`, app);
                        }
                    }

                    for (const app of applicationsToChange) {
                        const applicationToUpdate = applicationStateArr.find(c => c.link === app.link);
                        if (!applicationToUpdate)
                            continue ;
                        await updateApplication({id: applicationToUpdate.id, status: app.status, active:applicationToUpdate.active})
                    }
                    fetchData("application");
                    console.log("All applications imported successfully!");
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