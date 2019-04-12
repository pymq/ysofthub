import React from "react";
import Media from 'react-bootstrap/Media'
import { Link } from "react-router-dom";

export default class CommentList extends React.Component {
    render() {
        // const username = this.props.match.params.username;
        return (
            <ul className="list-unstyled">
                {this.props.comments.map(comment => {
                    const date = new Date(Date.parse(comment.created_at));
                    // <VideoCard key={comment.id} {...comment} />
                    return (<Media as="li" key={comment.id} className="mb-3">
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src="https://via.placeholder.com/64"
                            alt=""
                        />
                        <Media.Body>
                            <h5>
                                <Link to={`/channel/${comment.username}`}>
                                    <span style={{ color: "#0a0a0a" }} className="mr-3">{comment.username}</span>
                                </Link>
                                <span className="text-muted">{date.toLocaleString()} </span>
                            </h5>
                            <p style={{ whiteSpace: "pre" }}>
                                {comment.message}
                            </p>
                        </Media.Body>
                    </Media>
                    )
                })}
            </ul>
        );
    }


}

