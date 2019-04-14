import React from "react";
import Table from "react-bootstrap/Table"
import PlatformTableRow from "./PlatformTableRow";

const CorrectIcon = process.env.PUBLIC_URL + '/correct.svg'

const ProjectInfo = props => {
    const { id, created_at, title, goal, description, team, platform, contacts } = props;
    const re = /\s+|\s*\;\s*|\s*\,\s*/;
    const platformArray = String(platform).split(re);
    const teamArray = String(team).split(re);
    return (
        <div>
            <h1>{title}</h1>
            <span className={"goal_text mb-2 text-muted"}>"{goal}"</span>

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
        </div>
    );
};

export default ProjectInfo;