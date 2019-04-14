import React from "react";
import axios from "axios";

import NewsCard from './NewsCard'

const CorrectIcon = process.env.PUBLIC_URL + '/correct.svg';



export default class NewsAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.id,
            news: null,
        };
        console.log(this.state.projectId)
    }

    componentDidMount() {
        // console.log("match:", this.props.match); //! REMOVE
        axios
            .get(`/api/projects/${this.state.projectId}/news/`)
            .then(response => {
                console.log("projects", response.data);  //! REMOVE
                this.setState({ news: response.data });
            });
    }
    render() {
        return (
            <div>
            {this.state.news!=null&&this.state.news!==undefined ?
        <div>
            {this.state.news.map(news => (
                <NewsCard key={news.id} {...news} />
            ))}
        </div> : ""
            }
            </div>
        );
    }
}