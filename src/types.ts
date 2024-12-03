import {Dayjs} from "dayjs";

export enum ApplicationStatus {
    GHOSTED = "GHOSTED",
    REJECTED = "REJECTED",
    APPLIED = "APPLIED",
    INTERVIEW = "INTERVIEW",
    OFFER = "OFFER",
    CALLED = "CALLED",
    ACCEPTED = "ACCEPTED",
}

export interface Company {
    id: string;
    name: string;
}

export interface Application {
    id: string;
    name: string;
    company: Company;
    appliedAt: Dayjs | Date;
    lastUpdate: Date;
    status: ApplicationStatus;
    active: boolean;
    link: string;
    statusHistory: ApplicationStatusHistory[];
}

export interface ApplicationForm {
    name: string;
    appliedAt: Date;
    company: Company;
    link: string;
}

export interface UpdateApplicationForm {
    status: ApplicationStatus;
    id: string;
    active: boolean;
}

export interface ApplicationState {
    companies: Company[];
    applications: Application[];
    statistics: Statistics | null;
    fetchData: (value: ContextFetcher) => void;
    addCompany: (name: string) => Promise<Company>;
    addApplication: (form: ApplicationForm) => Promise<Application>;
    updateApplication: (form: UpdateApplicationForm) => Promise<Application>;
}

export interface CompanyInfo {
    name: string;
    applications: Application[];
    count: number;
    id: string;
}

export interface Statistics {
    companies: CompanyInfo[];
    applications: Application[];
    active: number;
    rejected: number;
    accepted: number;
    offers: number;
    interviews: number;
    applicationsCounter: number;
    ghosted: number;
    called: number;
}

export interface ApplicationStatusHistory {
    id: string;
    application: Application;
    status: ApplicationStatus;
    changedAt: Date;
}

export type ContextFetcher = "company" | "application" | "statistics";