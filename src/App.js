import React, { Component } from "react";
import swal from 'sweetalert';
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Column from "./Column";
import Row from "./Row";
import CarCard from "./components/CarCard";
import cars from "./cars.json";
import "./App.css";

// Standard javascript for shuffling arrays

function randomCars(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//setting the state, getting status of cars, score, and if cars have been clicked
class App extends Component {
  state = {
    cars,
    currentScore: 0,
    clicked: [],
  };
//logic for when an image is clicked
  onClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.incrementScore();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.resetGame();
    }
  };
//logic for incrementing score for when an image is clicked
  incrementScore = () => {
    const newGameScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newGameScore,
    });
    //how you win the game, will prompt a win after 4 consecutive right guesses
    if (newGameScore === 4) {
      swal("You Won!");
    this.shuffleIt();
    this.resetGame();
    }
    this.shuffleIt();
    
  };
//function to reset the score, and status of the click on the imgages
//also a reshuffle
  resetGame = () => {
    this.setState({
      currentScore: 0,
      clicked: []
    });
    this.shuffleIt();
  };

  shuffleIt = () => {
    let shuffledCars = randomCars(cars);
    this.setState({ cars: shuffledCars });
  };
//render function to render the components of the app also gets the cars using the map method
  render() {
    return (
      <Wrapper>

        <Title>
          <br></br>
          How good is your memory? 
          <br></br>
          Don't click on the same car more than once! 
          <br></br>
          Memorize 4 to win!
          <br></br>
          <br></br>
          Score = {this.state.currentScore}
        </Title>
        <Container>
          <Row>
            {this.state.cars.map(car => (
              <Column size="md-4 sm-4 lg-4">
                <CarCard
                  key={car.id}
                  onClick={this.onClick}
                  incrementScore={this.incrementScore}
                  resetGame={this.resetGame}
                  shuffleIt={this.shuffleIt}
                  id={car.id}
                  image={car.image}
                />
                
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}
export default App;