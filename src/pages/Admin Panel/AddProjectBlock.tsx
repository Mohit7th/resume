import React, { useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export default function ProjectsBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    const [projects, setProjects] = React.useState(
        userdata.projects.professional
    );

    useEffect(() => {
        if (userdata.projects.professional)
            setProjects(userdata.projects.professional);
    }, [userdata]);

    function updateProjects() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_PROJECTS",
                payload: {
                    professional: projects,
                },
            });
        }
    }

    function handleProjectChange(
        _index: number,
        field: string,
        newValue: string
    ) {
        const updatedProjects = projects.map((project, index) =>
            index === _index ? { ...project, [field]: newValue } : project
        );

        setProjects(updatedProjects);
    }

    return (
        <div className="update-block">
            {projects.map((project, index) => (
                <div key={project._id}>
                    <label>Project Name:</label>
                    <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                            handleProjectChange(index, "name", e.target.value)
                        }
                    />

                    <label>Description: </label>
                    <input
                        type="text"
                        value={project.description}
                        onChange={(e) =>
                            handleProjectChange(
                                index,
                                "description",
                                e.target.value
                            )
                        }
                    />

                    <label>Url: </label>
                    <input
                        type="text"
                        value={project.url}
                        onChange={(e) =>
                            handleProjectChange(
                                index,
                                "url",
                                e.target.value
                            )
                        }
                    />
                </div>
            ))}

            <button onClick={updateProjects}>Update</button>
        </div>
    );
}
