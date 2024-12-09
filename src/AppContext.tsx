import {ReactNode, useEffect, useState} from 'react';
import {
    Application,
    ApplicationForm,
    Company,
    ContextFetcher,
    Statistics,
    UpdateApplicationForm
} from "./types.ts";
import {ENDPOINT, GlobalStateContext} from "./GlobalState.tsx";

interface GlobalStateProviderProps {
    children: ReactNode;
}

export const GlobalStateProvider = ({children}: GlobalStateProviderProps) => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [statistics, setStatistics] = useState<Statistics | null>(null);

    const fetchData = async (value: ContextFetcher) => {
        const response = await fetch(`${ENDPOINT}/api/${value}`);
        const data = await response.json();
        if (value === "company") {
            setCompanies(data);
        } else if (value === "application") {
            setApplications(data);
        } else if (value === "statistics") {
            setStatistics(data);
        }
    }

    const addCompany = async (name: string) => {
        const response = await fetch(`${ENDPOINT}/api/company`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({name}),
        });
        const data = await response.json() as Company;
        setCompanies([...companies, data]);
        await fetchData("statistics");
        return data;
    }

    const addApplication = async (form: ApplicationForm) => {
        const response = await fetch(`${ENDPOINT}/api/application`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(form),
        });
        const data = await response.json() as Application;
        setApplications([...applications, data]);
        await fetchData("statistics");
        return data;
    }

    // TODO: Probably need to update this
    const updateApplication = async (form: UpdateApplicationForm) => {
        const {id, ...rest} = form;
        const response = await fetch(`${ENDPOINT}/api/application/${id}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(rest),
        });
        const data = await response.json() as Application;
        setApplications((prevApplications) => {
            return prevApplications.map((app) => app.id === data.id ? data : app);
        });
        await fetchData("statistics");
        return data;
    }

    useEffect(() => {
        fetchData("company").catch((e: Error) => console.error(e));
        fetchData("application").catch((e: Error) => console.error(e));
        fetchData("statistics").catch((e: Error) => console.error(e));
    }, []);

    return (<GlobalStateContext.Provider value={{
            companies,
            applications,
            statistics,
            fetchData,
            addCompany,
            addApplication,
            updateApplication,
        }}>
            {children}
        </GlobalStateContext.Provider>)
}

