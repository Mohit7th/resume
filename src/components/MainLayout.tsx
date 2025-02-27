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

    const tableHeader = header.map((header, index) => <th>{header}</th>);

    const tableBody = header.map((col) =>
        resumeData.skills[col].map((data) => (
            <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.experience}</td>
            </tr>
        ))
    );

    return (
        <div>
            <table>
                <thead>
                    <tr>{tableHeader}</tr>
                </thead>
                <tbody>{tableBody}</tbody>
            </table>
        </div>
    );
}

function Projects() {
    return <div></div>;
}

function WorkHistory() {
    return <div></div>;
}
