import React from "react";

import Card from "react-bootstrap/Card";

const NewsCard = props => {
    const { created_at, title, content } = props;
    const date = new Date(Date.parse(created_at));

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

                <Card.Text style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                    {/* {description} */}
                    {content}...
                    {/* <small className="text-muted mr-3">{user}</small> */}
                </Card.Text>

            </Card.Body>
        </Card>
        </div>
    );
};

export default NewsCard;