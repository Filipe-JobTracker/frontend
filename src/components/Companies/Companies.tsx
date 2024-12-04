import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import CompanyTable from "./CompanyTable"
import {CompanyInfo} from "../../types.ts";
import {useGlobalState} from "../../GlobalState.tsx";

export interface CompanyProps {
    companies: CompanyInfo[];
}

export default function Companies() {
    const {
        applications,
        companies: companyData,
        statistics,
        fetchData
    } = useGlobalState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            fetchData("statistics");
            if (statistics) {
                setLoading(false);
            }
        };

        fetchStatistics().catch(e => console.error(e));
    }, [companyData, applications]);

    if (loading) {
        return (<Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Typography variant="h4">Loading...</Typography>
            </Box>);
    }

    if (!statistics) {
        return (<Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Typography variant="h4">Failed to load data</Typography>
            </Box>);
    }

    const companies: CompanyInfo[] = statistics.companies;

    return (<Box sx={{
            my: 1, bgcolor: 'background.paper', minWidth: '75vw',
        }}>
                <Typography variant="h4" gutterBottom sx={{
                    mx: 3, mt: 0, mb: 2, textAlign: 'center',
                }}>
                    Companies applied
                </Typography>

                <CompanyTable companies={{companies: companies}}/>
        </Box>);
}