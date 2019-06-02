import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class CreateExercise extends Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
  };
  componentDidMount = () => {
    axios
      .get("http://localhost:5000/users/")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username),
            username: res.data[0].username
          });
        }
      })
      .catch(err => console.log(err));
  };
  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };
  onChangeDiscription = e => {
    this.setState({
      description: e.target.value
    });
  };
  onChangeDuration = e => {
    this.setState({
      duration: e.target.value
    });
  };
  onChangeDate = date => {
    this.setState({
      date: date
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then(res => console.log(res.data));
    //take the user to the home page after submitting the form
    window.location = "/";
  };
  render() {
    return (
      <div>
        <h3>Create New Exercise</h3>
        <form onSubmit={this.onSubmit}>
          {/* select username */}
          <div>
            <label>Username:</label>
            <select
              ref="userInput"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user, indx) => {
                return (
                  <option key={indx} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          {/* add description */}
          <div>
            <label>Description</label>
            <input
              type="text"
              required
              value={this.state.description}
              onChange={this.onChangeDiscription}
            />
          </div>
          {/* add duration */}
          <div>
            <label>Duration in minutes</label>
            <input
              type="text"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          {/* pick a date */}
          <div>
            <label>Date:</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          {/* submit btn */}
          <div>
            <button type="submit">Create Exercise Log</button>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateExercise;
