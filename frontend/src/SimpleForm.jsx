import React from 'react';

const Greetings = ({ firstName, lastName }) => (
  <div>
      Hey you! {firstName} {lastName}!
  </div>
);

class SimpleForm extends React.Component {
  state = {
    firstName: "",
    firstNameError: "",
    lastName: "",
  };

  validateName = name => {
    const regex = /[A-Za-z]{3,}/;

    return !regex.test(name)
      ? "The name must contain at least three letters. Numbers and special characters are not allowed."
      : "";
  };

  onFirstNameBlur = () => {
    const { firstName } = this.state;

    const firstNameError = this.validateName( firstName );

    return this.setState({ firstNameError });
  };


  onFirstNameChange = event =>
    this.setState({
      firstName: event.target.value
    });

  onlastNameChange = event =>
    this.setState({
      lastName: event.target.value
    });

  render() {
    return (
      <div>
        <input type="text" name="firstName" onChange={this.onFirstNameChange} onBlur={this.onFirstNameBlur}/>
        <br/>
        {this.state.firstNameError && <div>{this.state.firstNameError}</div>}
        <br/>
        <input type="text" name="lastName" onChange={this.onlastNameChange} />

        <Greetings firstName={this.state.firstName} lastName={this.state.lastName} />
      </div>
    );
  }
}


export default SimpleForm;
