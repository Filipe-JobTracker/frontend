import {createContext, useContext} from "react";
import {ApplicationState} from "./types.ts";

export const GlobalStateContext = createContext<ApplicationState | undefined>(undefined);

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
}