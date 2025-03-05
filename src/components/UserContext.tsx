import {
    createContext,
    Dispatch,
    useReducer,
    ReactNode,
    useContext,
} from "react";
import { ResumeData } from "../types"; // Import type
import { resumeData } from "./data";

// Define action type
type Action =
    | { type: "UPDATE_TITLE_HEADER"; payload: ResumeData["titleHeader"] }
    | { type: "UPDATE_SUMMARY"; payload: ResumeData["summary"] }
    | { type: "UPDATE_SKILLS"; payload: ResumeData["skills"] }
    | { type: "UPDATE_PROJECTS"; payload: ResumeData["projects"] }
    | { type: "UPDATE_WORK_HISTORY"; payload: ResumeData["workHistory"] };

// Define the type of state
type UserDataState = ResumeData;

// Define the type of dispatch function
type UserDataDispatch = Dispatch<Action>;

export const UserDataContext = createContext<UserDataState>(resumeData);
export const UserDataDispatchContext = createContext<UserDataDispatch>(() => {
    throw new Error("UserDataDispatchContext is not provided");
});

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

// Properly Typed Reducer Function
function userDataReducer(userdata: ResumeData, action: Action): ResumeData {
    switch (action.type) {
        case "UPDATE_TITLE_HEADER":
            return { ...userdata, titleHeader: action.payload };

        case "UPDATE_SUMMARY":
            return { ...userdata, summary: action.payload };

        case "UPDATE_SKILLS":
            return { ...userdata, skills: action.payload };

        case "UPDATE_PROJECTS":
            return { ...userdata, projects: action.payload };

        case "UPDATE_WORK_HISTORY":
            return { ...userdata, workHistory: action.payload };

        default:
            throw new Error(`Invalid action type`);
    }
}
