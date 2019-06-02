import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.component";
import ExerciseList from "./components/ExerciseList.component";
import EditExercise from "./components/EditExercise.component";
import CreateExercise from "./components/CreateExercise.component";
import CreateUser from "./components/CreateUser.component";
function App() {
  return (
    <Router>
      <div className="App">
        <h1>This is React App!! Woohoo... feel so cool to be back</h1>
        <Navbar />
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
