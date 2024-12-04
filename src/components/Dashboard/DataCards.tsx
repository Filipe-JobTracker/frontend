import Box from "@mui/material/Box";
import DataCard from "./DataCard.tsx";
import {useEffect, useState} from "react";
import {CompanyInfo} from "../../types.ts";
import {useGlobalState} from "../../GlobalState.tsx";

export default function DataCards() {
    const {statistics} = useGlobalState();
    const [companiesWithApplications, setCompaniesWithApplications] = useState<CompanyInfo[]>([]);

    useEffect(() => {
        const companiesWithApps = statistics?.companies.filter((info) => info.count > 0);
        setCompaniesWithApplications(companiesWithApps ?? []);
        // console.log(statistics);
    }, [statistics]);

    return (<Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 2fr)',
        justifyContent: 'right',
        alignContent: 'center',
        rowGap: 3,
        columnGap: 0,
        // gridTemplateRows: 'repeat(3, 1fr)'
    }}>
        <DataCard title="Active Applications"
                  value={statistics?.active ?? 0}/>
        <DataCard title="Total Rejections"
                  value={statistics?.rejected ?? 0}/>
        <DataCard title="Total Offers"
                  value={statistics?.offers ?? 0}/>
        <DataCard title="Total Applications"
                  value={statistics?.applicationsCounter ?? 0}/>
        <DataCard title="Total Companies Applied"
                  value={companiesWithApplications.length}/>
        <DataCard title="Total Interviews"
                  value={statistics?.interviews ?? 0} />
        <DataCard title="Total Accept"
                  value={statistics?.accepted ?? 0} />
        <DataCard title="Total Ghosted"
                  value={statistics?.ghosted ?? 0} />
        <DataCard title="Total Called"
                  value={statistics?.called ?? 0} />
    </Box>)
}

// ghosted: number;
// called: number;