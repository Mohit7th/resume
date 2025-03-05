import React from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export default function WorkHistoryBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    const [workHistory, setWorkHistory] = React.useState(userdata.workHistory);

    function updateWorkHistory() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_WORK_HISTORY",
                payload: workHistory,
            });
        }
    }

    function handleWorkHistoryChange(
        _index: number,
        field: string,
        newValue: string
    ) {
        const updatedWorkHistory = workHistory.map((detail, index) =>
            index == _index ? { ...detail, [field]: newValue } : detail
        );

        setWorkHistory(updatedWorkHistory);
    }

    return (
        <div className="update-block">
            <h2>Work History</h2>
            {workHistory.map((detail, index) => (
                <div key={detail._id}>
                    <label>Company:</label>
                    <input
                        type="text"
                        value={detail.company}
                        onChange={(e) =>
                            handleWorkHistoryChange(
                                index,
                                "company",
                                e.target.value
                            )
                        }
                    />

                    <label>Position:</label>
                    <input
                        type="text"
                        value={detail.position}
                        onChange={(e) =>
                            handleWorkHistoryChange(
                                index,
                                "position",
                                e.target.value
                            )
                        }
                    />

                    <label>Website:</label>
                    <input
                        type="text"
                        value={detail.website}
                        onChange={(e) =>
                            handleWorkHistoryChange(
                                index,
                                "website",
                                e.target.value
                            )
                        }
                    />
                </div>
            ))}
            <button onClick={updateWorkHistory}>Update</button>
        </div>
    );
}
