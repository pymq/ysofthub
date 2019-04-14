import React from "react";
import Card from "react-bootstrap/Card";

const CommentCard = props => {
    const { id, created_at, message, user, owner } = props;
    const date = new Date(Date.parse(created_at));
    const userMark = user ==owner ? "Project owner" : "user";
    return (
        <div style={{ width: "25rem", marginTop: "3rem", marginBottom: "3rem", marginLeft: "2.5rem"}}>
            <Card>

                <Card.Body>


                    <Card.Subtitle className="mb-2 text-muted">
                        {userMark}
                    </Card.Subtitle>

                    <Card.Text style={{ whiteSpace: "pre" }}>
                        {/* {description} */}
                        {message}...
                        {/* <small className="text-muted mr-3">{user}</small> */}
                    </Card.Text>

                    <Card.Text>
                        <small className="text-muted">{date.toLocaleString()} </small>
                    </Card.Text>

                </Card.Body>

            </Card>
        </div>
    );
};

export default CommentCard;