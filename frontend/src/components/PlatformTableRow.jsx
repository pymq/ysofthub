import React from "react";
import CorrectIcon from "./correct.svg"

export default class ProjectCardGroupBase extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.platform}</td>
                <td><img src = {CorrectIcon}></img></td>
            </tr>
        );
    }
}