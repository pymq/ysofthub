import React from "react";
import  IssuesCreateNewComment from "./IssuesCreateNewComment"
import Card from "react-bootstrap/Card";
import CommentCard from "./CommentCard"
import axios from "axios";
import NewsCard from "./NewsAll";

export default class IssuesCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            created_at: this.props.created_at,
            title: this.props.title,
            description: this.props.description,
            comments: []
        }

    }

    componentDidMount() {
        // console.log("match:", this.props.match); //! REMOVE
        console.log(`/api/projects/${this.props.keyID}/issues/${this.state.id}/comments/`);
        axios
            .get(`/api/projects/${this.props.keyID}/issues/${this.state.id}/comments/`)
            .then(response => {
                console.log("comments", response.data);  //! REMOVE
                this.setState({ comments: response.data });
            });
    }


    render() {
        const { id, created_at, title, description } = this.state;
        const date = new Date(Date.parse(created_at));
        console.log(id);
        return (
        <div className={"NewsCard"}>
            <Card>

                <Card.Body>

                    <Card.Title>
                        {title}
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">
                        {date.toLocaleString()}
                    </Card.Subtitle>

                    <Card.Text style={{whiteSpace: "pre"}}>
                        {/* {description} */}
                        {description}...
                        {/* <small className="text-muted mr-3">{user}</small> */}
                    </Card.Text>

                </Card.Body>

                <IssuesCreateNewComment id={id} projectId={this.props.keyID}>
                </IssuesCreateNewComment>

                <div>
                    {this.state.comments.reverse().map(comments => (
                        <CommentCard key={comments.id} {...comments} />
                    ))}
                </div>

            </Card>
        </div>
    )
        ;
    }
};