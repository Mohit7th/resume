import React, { useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export default function ProjectsBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    const [projects, setProjects] = React.useState(userdata.projects);
    type ProjectCategory = keyof typeof projects;


    function updateProjects() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_PROJECTS",
                payload: projects,
            });
        }
    }

    function handleProjectChange(
        _index: number,
        category: ProjectCategory,
        field: string,
        newValue: string
    ) {
        const categoryArray = projects[category];

        // Ensure the block exists and is an array
        if (!Array.isArray(categoryArray)) {
            console.error(`Invalid block: ${category}`);
            return;
        }

        const updatedProjects = categoryArray.map((project, index) =>
            index === _index ? { ...project, [field]: newValue } : project
        );

        setProjects((prevCategory) => ({
            ...prevCategory,
            [category]: updatedProjects,
        }));
    }
    const categoryKeys = Object.keys(projects);
    return (
        <div className="update-block">
            <h2>Projects</h2>
            {categoryKeys.map((categoryKey) =>
                projects[categoryKey as ProjectCategory].map(
                    (project, index) => (
                        <div key={project._id}>
                            <label>Project Name:</label>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) =>
                                    handleProjectChange(
                                        index,
                                        categoryKey as ProjectCategory,
                                        "name",
                                        e.target.value
                                    )
                                }
                            />

                            <label>Description: </label>
                            <input
                                type="text"
                                value={project.description}
                                onChange={(e) =>
                                    handleProjectChange(
                                        index,
                                        categoryKey as ProjectCategory,
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
                                        categoryKey as ProjectCategory,
                                        "url",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    )
                )
            )}

            <button onClick={updateProjects}>Update</button>
        </div>
    );
}
