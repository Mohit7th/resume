import {
    createContext,
    Dispatch,
    useReducer,
    ReactNode,
    useContext,
} from "react";
import { resumeData } from "./data";

// Define action type
type Action = { type: string; payload?: any };

// Define the type of state
type UserDataState = typeof resumeData;

// Define the type of dispatch function
type UserDataDispatch = Dispatch<Action>;

export const UserDataContext = createContext<UserDataState | null>(null);
export const UserDataDispatchContext = createContext<UserDataDispatch | null>(
    null
);

export function useUserData() {
    return useContext(UserDataContext);
}

export function useUserDataDispatch() {
    return useContext(UserDataDispatchContext);
}

// Define props type
interface UserDataProviderProps {
    children: ReactNode;
}

export function UserDataProvider({ children }: UserDataProviderProps) {
    const [userdata, dispatch] = useReducer(userDataReducer, resumeData);

    return (
        <UserDataContext.Provider value={userdata}>
            <UserDataDispatchContext.Provider value={dispatch}>
                {children}
            </UserDataDispatchContext.Provider>
        </UserDataContext.Provider>
    );
}

function userDataReducer(userdata: any, action: { type: any }) {
    switch (action.type) {
        case "UPDATE_TITLE_HEADER":
            return { ...userdata, title: "New Title" };
            break;
        case "UPDATE_SUMMARY":
            return { ...userdata, summary: "New Summary" };
            break;
        case "UPDATE_SKILLS":
            return { ...userdata, skills: ["New Skill"] };
            break;
        case "UPDATE_PRODJECTS":
            return { ...userdata, projects: ["New Project"] };
            break;
        case "UPDATE_WORK_HISTORY":
            return { ...userdata, workHistory: ["New Work History"] };
            break;
        default:
            throw new Error("Invalid action type");
    }
}
