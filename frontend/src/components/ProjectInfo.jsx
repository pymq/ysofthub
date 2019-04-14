import React from "react";
import Table from "react-bootstrap/Table"
import PlatformTableRow from "./PlatformTableRow";


const ProjectInfo = props => {
    const { created_at, title, goal, description, team, platform, contacts } = props;
    const re = /\s+|\s*;\s*|\s*,\s*/;
    const platformArray = String(platform).split(re);
    const teamArray = String(team).split(re);
    const date = new Date(Date.parse(created_at));
    return (
        <div>
            <h1>{title}</h1>
            <span className={"goal_text mb-2 text-muted"}>"{goal}"</span>
            <div className={"mb-2"}>Founded {date.toDateString()}</div>

            <h2>Description</h2>
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {description}
            </div>

            <h2>Platforms</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {platformArray.map((platform, index) => (
                        <PlatformTableRow platform={platform} key={index} />
                    ))}
                </tbody>
            </Table>

            <h2>Developers</h2>
            <ul>
                {teamArray.map((teamMember, index) => (
                    <li key={index}>{teamMember}</li>
                ))
                }
            </ul>
            <h2>Contacts</h2>
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {contacts}
            </div>
        </div>
    );
};

export default ProjectInfo;