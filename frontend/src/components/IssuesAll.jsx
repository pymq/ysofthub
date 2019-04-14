import React from "react";
import axios from "axios";

import IssuesCard from './IssuesCard'

const CorrectIcon = process.env.PUBLIC_URL + '/correct.svg';



export default class NewsAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.id,
            issues: [],
        };
    }

    componentDidMount() {
        // console.log("match:", this.props.match); //! REMOVE
        axios
            .get(`/api/projects/${this.state.projectId}/issues/`)
            .then(response => {
                console.log("projects", response.data);  //! REMOVE
                this.setState({ issues: response.data });
            });
    }
    render() {
        return (
            <div>
                {this.state.issues.reverse().map(news => (
                    <IssuesCard key = {news.id} keyID = {this.state.projectId} {...news} />
                ))}
            </div>
        );
    }
}