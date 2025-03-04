import React from "react";
import { useContext } from "react";
import {
    UserDataContext,
    UserDataDispatchContext,
} from "../components/UserContext";
import { UserDataProvider } from "../components/UserContext";

const AdminPanel: React.FC = () => {
    return (
        <UserDataProvider>
            <h1>Admin Panel</h1>
            <TitleHeaderBlock />
            <SummaryBlock />
            <SkillsBlock />
            <ProjectsBlock />
            <WorkHistoryBlock />
        </UserDataProvider>
    );
};

function TitleHeaderBlock() {
    const [text, setText] = React.useState("");
    const userdata = useContext(UserDataContext);
    const dispatch = useContext(UserDataDispatchContext);

    function updateTitleHeader() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_TITLE_HEADER",
                payload: {
                    title: text,
                },
            });
        }
    }

    return (
        <div>
            <label>Title:</label>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateTitleHeader}>Update</button>
        </div>
    );
}

function SummaryBlock() {
    const [text, setText] = React.useState("");
    const userdata = useContext(UserDataContext);
    const dispatch = useContext(UserDataDispatchContext);

    function updateSummary() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_SUMMARY",
                payload: {
                    summary: text,
                },
            });
        }
    }

    return (
        <div>
            <label>Summary:</label>
            <input
                type="text"
                value={userdata?.summary.detailed ?? ""}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateSummary}>Update</button>
        </div>
    );
}
function SkillsBlock() {
    const [text, setText] = React.useState("");
    const userdata = useContext(UserDataContext);
    const dispatch = useContext(UserDataDispatchContext);

    function updateSkills() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_SKILLS",
                payload: {
                    summary: text,
                },
            });
        }
    }

    return (
        <div>
            <label>Skills:</label>
            <input
                type="text"
                value={userdata?.summary.detailed ?? ""}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateSkills}>Update</button>
        </div>
    );
}
function ProjectsBlock() {
    const [text, setText] = React.useState("");
    const userdata = useContext(UserDataContext);
    const dispatch = useContext(UserDataDispatchContext);

    function updateProjects() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_PROJECTS",
                payload: {
                    summary: text,
                },
            });
        }
    }

    return (
        <div>
            <label>Projects:</label>
            <input
                type="text"
                value={userdata?.summary.detailed ?? ""}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateProjects}>Update</button>
        </div>
    );
}
function WorkHistoryBlock() {
    const [text, setText] = React.useState("");
    const userdata = useContext(UserDataContext);
    const dispatch = useContext(UserDataDispatchContext);

    function updateWorkHistory() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_WORK_HISTORY",
                payload: {
                    summary: text,
                },
            });
        }
    }
    return (
        <div>
            <label>Work History:</label>
            <input
                type="text"
                value={userdata?.summary.detailed ?? ""}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateWorkHistory}>Update</button>
        </div>
    );
}

export default AdminPanel;
