import React from "react";
import NewsAll from './NewsAll'
import NewsCreateNew from './NewsCreateNew'
import ProjectHeader from "./ProjectHeader";


export default class NewsPage1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.id,
            comments: [],
            project:"",
            commentMessage: "",
        };
    }

    render() {
        let innerComponent = (
            <div>
            <NewsCreateNew id={this.state.projectId}> </NewsCreateNew>
            <NewsAll id={this.state.projectId}> </NewsAll>
            </div>
        );
        return (
            <div style={{ marginTop: "4.5rem" }}>
                <ProjectHeader defaultActiveKey={"News"} projectId={this.state.projectId} innerComponent={innerComponent} />
            </div>
        );
    }
}