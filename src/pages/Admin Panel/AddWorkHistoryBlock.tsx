import React, { useEffect, useState } from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";
import { WorkHistory } from "../../types"; // Import the correct type

export default function WorkHistoryBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    // Ensure workHistory is properly initialized
    const [workHistory, setWorkHistory] = useState<WorkHistory[]>(
        userdata?.workHistory || []
    );

    // Sync workHistory state when userdata changes
    useEffect(() => {
        if (userdata?.workHistory) {
            setWorkHistory(userdata.workHistory);
        }
    }, [userdata]);

    function updateWorkHistory() {
        if (!dispatch) {
            console.error("Dispatch function is not available");
            return;
        }

        dispatch({
            type: "UPDATE_WORK_HISTORY",
            payload: workHistory, 
        });
    }

    function handleWorkHistoryChange(
        index: number,
        field: keyof WorkHistory,
        newValue: string
    ) {
        setWorkHistory((prevWorkHistory) =>
            prevWorkHistory.map((detail, i) =>
                i === index ? { ...detail, [field]: newValue } : detail
            )
        );
    }

    return (
        <div className="update-block">
            <h2>Work History</h2>

            {workHistory.map((detail, index) => (
                <div key={detail._id} className="work-item">
                    <label>Company:</label>
                    <input
                        type="text"
                        value={detail.company}
                        onChange={(e) =>
                            handleWorkHistoryChange(index, "company", e.target.value)
                        }
                    />

                    <label>Position:</label>
                    <input
                        type="text"
                        value={detail.position}
                        onChange={(e) =>
                            handleWorkHistoryChange(index, "position", e.target.value)
                        }
                    />

                    <label>Website:</label>
                    <input
                        type="text"
                        value={detail.website}
                        onChange={(e) =>
                            handleWorkHistoryChange(index, "website", e.target.value)
                        }
                    />
                </div>
            ))}

            <button onClick={updateWorkHistory}>Update</button>
        </div>
    );
}
