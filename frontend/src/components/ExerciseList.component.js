import React, { Component } from "react";

import Exercise from "./Exercise.component";
import axios from "axios";
class ExerciseList extends Component {
  state = {
    exercises: []
  };
  componentDidMount = () => {
    axios
      .get("http://localhost:5000/exercises/")
      .then(res => {
        this.setState({
          exercises: res.data
        });
      })
      .catch(err => console.log(err));
  };
  deleteExercise = id => {
    axios.delete(`http://localhost:5000/exercises/${id}`).then(res => {
      console.log(res.data);
    });
    this.setState({
      exercises: this.state.exercises.filter(element => element._id !== id)
    });
  };
  updateExercise = () => {};
  exerciseList = () => {
    return this.state.exercises.map(exer => {
      return (
        <Exercise
          key={exer._id}
          deleteExercise={this.deleteExercise}
          exercise={exer}
        />
      );
    });
  };
  render() {
    return (
      <div>
        <h3>Exercise List component</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
export default ExerciseList;
