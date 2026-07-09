import { useTheme } from "@emotion/react";
import { useUserData } from "../../context/UserContext";
import { getPublicAssetPath } from "../../utils/publicPath";

interface ProjectModalProps {
    projectId: string;
}

export default function ProjectModal({ projectId }: ProjectModalProps) {
    const userdata = useUserData();
    const theme = useTheme;

    const selectedProject = userdata.projects.find(
        (project) => project._id === projectId
    );

    if (!selectedProject) {
        return <h1>No projects</h1>;
    }

    return (
        <>
            <img
                src={getPublicAssetPath(selectedProject.image)}
                alt={selectedProject.name}
            />
            <h1>
                {selectedProject.name}
                <span>
                    <a
                        href={selectedProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Link
                    </a>
                </span>
            </h1>

            <p>{selectedProject.description}</p>
            <div>
                <ul className="project-responsibilities">
                    {selectedProject.responsibilities.map((resp, indx) => (
                        <li key={indx}>{resp}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
