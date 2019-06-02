import React, { Component } from "react";
import axios from "axios";
class CreateUser extends Component {
  state = {
    username: ""
  };
  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username
    };
    console.log(user);
    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data));
    this.setState({
      username: ""
    });
  };
  render() {
    return (
      <div>
        <h3>Create a new user</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Full name: </label>
            <input
              type="text"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
            <div>
              <input type="submit" value="Create user" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateUser;
