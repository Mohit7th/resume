import {
    createContext,
    Dispatch,
    useReducer,
    ReactNode,
    useContext,
    useEffect,
} from "react";
import { ResumeData } from "../types"; // Import type
import { loadResumeData, saveResumeData } from "../data/resumeStorage";

// Define action type
type Action =
    | { type: "SET_RESUME"; payload: ResumeData }
    | { type: "UPDATE_TITLE_HEADER"; payload: ResumeData["titleHeader"] }
    | { type: "UPDATE_SUMMARY"; payload: ResumeData["summary"] }
    | { type: "UPDATE_SKILLS"; payload: ResumeData["skills"] }
    | { type: "UPDATE_PROJECTS"; payload: ResumeData["projects"] }
    | { type: "UPDATE_WORK_HISTORY"; payload: ResumeData["workHistory"] };

// Define the type of state
type UserDataState = ResumeData;

// Define the type of dispatch function
type UserDataDispatch = Dispatch<Action>;

export const UserDataContext = createContext<UserDataState>(loadResumeData());
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
    // Lazily initialise from local storage (falls back to the bundled seed).
    const [userdata, dispatch] = useReducer(
        userDataReducer,
        undefined,
        loadResumeData
    );

    // Persist every change so admin edits survive a refresh and are reflected
    // on the public site (within the same browser).
    useEffect(() => {
        saveResumeData(userdata);
    }, [userdata]);

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
        case "SET_RESUME":
            return action.payload;

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
