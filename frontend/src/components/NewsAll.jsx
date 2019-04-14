import React from "react";
import axios from "axios";

import NewsCard from './NewsCard'


export default class NewsAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.id,
            news: [],
        };
        console.log(this.state.projectId)
    }

    componentDidMount() {
        axios
            .get(`/api/projects/${this.state.projectId}/news/`)
            .then(response => {
                this.setState({ news: response.data });
            });
    }
    render() {
        return (
            <div>
                {this.state.news.reverse().map(news => (
                    <NewsCard key={news.id} {...news} />
                ))}
            </div>
        );
    }
}