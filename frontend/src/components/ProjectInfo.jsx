import React from "react";
import Table from "react-bootstrap/Table"
import CorrectIcon from "./correct.svg"
import PlatformTableRow from "./PlatformTableRow";

const ProjectInfo = props => {
    const { id, created_at, title, goal,description, team, platform, contacts  } = props;
    const  re = /\s+|\s*\;\s*|\s*\,\s*/;
    const platformArray = String(platform).split(re);
    const teamArray = String(team).split(re);
        return (
            <div>
                <h1>{title}</h1>
                <span className={"goal_text mb-2 text-muted"}>"{goal}"</span>

                <h2>Description</h2>
                {description};

                <h2>Platforms</h2>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {platformArray.map (platform => (
                        <PlatformTableRow platform={platform} />
                    ))}
                    </tbody>
                </Table>

                <h2>Developers</h2>
                <ul>
                {teamArray.map( teamMember => (
                    <li>{teamMember}</li>
                ))
                }
                </ul>
            </div>
        );
    };

export default ProjectInfo;