import React from "react";
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom";


export default class ProjectHeader extends React.Component {
    render() {
        return (
            <div>
                <div className={'projectPageLogoWrapper'}>
                    <img src={`/api/projects/${this.props.projectId}/logo.png`}></img>
                </div>
                <div className={'projectPageContentWrapper'}>
                    <Nav fill variant="tabs" defaultActiveKey={this.props.defaultActiveKey}>
                        <Nav.Item >
                            <Nav.Link eventKey="Project" as={Link} href={`/projects/${this.props.projectId}/`} to={`/projects/${this.props.projectId}/`}>Project</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="News" as={Link} href={`/projects/${this.props.projectId}/news`} to={`/projects/${this.props.projectId}/news`}>News</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Issues">Issues</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="Contacts">Contacts</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                        <Nav.Link eventKey="Downloads" as={Link} href={`/projects/${this.props.projectId}/downloads`} to={`/projects/${this.props.projectId}/downloads`}>Downloads</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {this.props.innerComponent}
                </div>
            </div>
        );
    }
}