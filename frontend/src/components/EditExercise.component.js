import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
class EditExercise extends Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
  };
  componentDidMount = () => {
    axios
      .get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date)
        });
      });
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
  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
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
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then(res => console.log(res.data));
    //take the user to the home page after submitting the form
    window.location = "/";
  };
  render() {
    return (
      <div>
        You are on the Edit Exercise component
        <form onSubmit={this.onSubmit}>
          {/* select username */}
          <div>
            <label>Username:</label>
            <select
              ref="userInput"
              required
              value={this.state.username}
              name="username"
              onChange={this.onChangeInput}
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
              name="description"
              value={this.state.description}
              onChange={this.onChangeInput}
            />
          </div>
          {/* add duration */}
          <div>
            <label>Duration in minutes</label>
            <input
              name="duration"
              type="text"
              value={this.state.duration}
              onChange={this.onChangeInput}
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
            <button type="submit">Update Exercise Log</button>
          </div>
        </form>
      </div>
    );
  }
}
export default EditExercise;
