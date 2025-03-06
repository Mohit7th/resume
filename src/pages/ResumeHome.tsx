import { Container } from "@mui/material";
import { resumeData } from "../components/data";

export default function ResumeHome() {
    return (
        <Container fixed>
            <TitleHeader />
            <Summary />
            <Skills />
            <Projects />
            <WorkHistory />
        </Container>
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
        <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" key={col}>
            <div>
                <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
                    <svg className="h-6 w-6 stroke-width"></svg>
                </span>
            </div>
            <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                {col}
            </h3>
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
        <div
            className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-2-2xl"
            key={project._id}
        >
            <div className="md:flex">
                <div className="md:shrink-0">
                    <img
                        className="h-48 w-full object-cover md:h-full md:w-48"
                        src="/img/buildings.jpg"
                        alt="not found"
                    />
                </div>
                <div className="p-8">
                    <div className="text-sm font-semibold tracking-wide text-indigo-500 upppercase">
                        {project.name}
                    </div>
                    <a
                        href={project.url}
                        className="mt-1 block text-lg leading-tight font-medium text-black hover:underline"
                    ></a>
                    <p className="mt-2 text-gray-500">{project.description}</p>
                </div>
            </div>
        </div>
    ));

    return <div>{projects}</div>;
}

function WorkHistory() {
    const workHistory = resumeData.workHistory.map((work: any) => {
        return (
            <div key={work._id}>
                <h2>{work.company}</h2>
                <p>
                    <b>{work.position}</b>
                </p>
                {work.reponsibilities.map((resp: any, index: number) => (
                    <p key={index}>{resp}</p>
                ))}
            </div>
        );
    });
    return <div>{workHistory}</div>;
}
