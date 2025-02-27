import { resumeData } from "./data";

export default function MainLayout() {
    return (
        <div className="App">
            <TitleHeader />
            <Summary />
            <Skills />
            <Projects />
            <WorkHistory />
        </div>
    );
}

function TitleHeader() {
    return (
        <div>
            <h1>{resumeData.titleHeader.name}</h1>
            <h2>{resumeData.titleHeader.title}</h2>
            <p>{resumeData.titleHeader.contact.email}</p>
        </div>
    );
}

function Summary() {
    return (
        <div>
            <p>{resumeData.summary.detailed}</p>
        </div>
    );
}

function Skills() {
    const header = Object.keys(resumeData.skills) as Array<
        keyof typeof resumeData.skills
    >;

    const tableBody = header.map((col) => (
        <div key={col}> 
            <h2>{col}</h2>
            {resumeData.skills[col].map((data) => (
                <ul key={data._id}>
                    <li>{data.name}</li>
                    <li>{data.experience}</li>
                </ul>
            ))}
        </div>
    ));

    return <div>{tableBody}</div>;
}

function Projects() {
    const projects = resumeData.projects.professional.map((project: any) => (
        <div key={project._id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
        </div>
    ));
    return <div>{projects}</div>;
}

function WorkHistory() {
    const workHistory = resumeData.workHistory.map((work: any) => {
        return (
            <div key={work._id}>
                <h2>{work.company}</h2>
                <p><b>{work.position}</b></p>
                {work.reponsibilities.map((resp: any) => (
                    <p>{resp}</p>
                ))}
            </div>
        );
    });
    return <div>{workHistory}</div>;
}
