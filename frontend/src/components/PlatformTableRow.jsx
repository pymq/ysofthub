import React from "react";
const CorrectIcon = process.env.PUBLIC_URL + '/correct.svg'

export default class ProjectCardGroupBase extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.platform}</td>
                <td><img src={CorrectIcon} alt=""></img></td>
            </tr>
        );
    }
}