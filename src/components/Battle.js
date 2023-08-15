import React from 'react';
import { Link} from "react-router-dom";

class Battle extends React.Component {
  constructor() {
    super();
    this.state = {
      playerOne: '',
      playerTwo: '',
      playerOneIsvisible: false,
      playerTwoIsvisible: false,
      playerOneData: null,
      playerTwoData: null,
    };
  }
  handlePlayerOne = (e) => {
    this.setState({
      playerOne: e.target.value,
    });
  };

  handlePlayerTwo = (e) => {
    this.setState({
      playerTwo: e.target.value,
    });
  };

  handleSubmitOne = (event) => {
    event.preventDefault();
    this.setState({
      playerOneIsvisible: true,
    });
    fetch(`https://api.github.com/users/${this.state.playerOne}`)
      .then((res) => res.json())
      .then((playerOneData) => this.setState({ playerOneData }));
  };
  handleSubmitTwo = (event) => {
    event.preventDefault();
    this.setState({
      playerTwoIsvisible: true,
    });
    fetch(`https://api.github.com/users/${this.state.playerTwo}`)
      .then((res) => res.json())
      .then((playerTwoData) => this.setState({ playerTwoData }));
  };
  render() {
    return (
      <div>
         <InstructioforUsers />
        <div>
          <h2 className='center player-heading'>Players</h2>
          <div className='players'>
            <div>
              {this.state.playerOneIsvisible ? (
                <PlayerOne playerOne={this.state.playerOneData} />
              ) : (
                <form onSubmit={this.handleSubmitOne} action="">
                  <label htmlFor="">Player One</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Github username"
                    onChange={(e) => this.handlePlayerOne(e)}
                    value={this.state.inputText}
                  />
                  <input disabled={!this.state.playerOne} className='submit' type="submit" value="submit" />
                </form>
              )}
            </div>
            <div>
              {this.state.playerTwoIsvisible ? (
                <PlayerTwo playerTwo={this.state.playerTwoData} />
              ) : (
                <form onSubmit={this.handleSubmitTwo} action="">
                  <label htmlFor="">Player Two</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Github username"
                    onChange={(e) => this.handlePlayerTwo(e)}
                    value={this.state.inputText}
                  />
                  <input disabled={!this.state.playerTwo} className='submit' type="submit" value="submit" />
                </form>
              )}
            </div>
          </div>
          {this.state.playerOneIsvisible && this.state.playerTwoIsvisible ? (
            <div className="text-center battle-btn">
              <Link
                to={`/battle/result/${this.state.playerOne}&&${this.state.playerTwo}`}
              >
                <button>Battle</button>
              </Link>
             
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default Battle;

function PlayerOne(props) {
  if (!props.playerOne) {
    return(
     <h3 className='text-center'>Loading...</h3>
    ) 
  }
  return (
    <div className='player-info'>
      <img className='player-img' src={props.playerOne.avatar_url} alt="" />
      <p>{props.playerOne.login}</p>
    </div>
  );
}
function PlayerTwo(props) {
  if (!props.playerTwo) {
    return(
      <h3 className='text-center'>Loading...</h3>
    ) 
  }
  return (
    <div className='player-info'>
      <img className='player-img' src={props.playerTwo.avatar_url} alt="" />
      <p>{props.playerTwo.login}</p>
    </div>
  );
}

// instruction for  the user
function InstructioforUsers() {
  return (
    <>
      <div>
        <h2 className="text-center">Instructions</h2>
        <div className="wrapper">
          <div className="instruction-card">
            <h2>Enter two Github username</h2>
            <div className="instruction-icon star">
              <i className="fas fa-user-friends users"></i>
            </div>
          </div>
          <div className="instruction-card">
            <h2 className="text-center">Battle</h2>
            <div className="instruction-icon  fork">
              <i className="fas fa-fighter-jet battle"></i>
            </div>
          </div>

          <div className="instruction-card">
            <h2 className="text-center">See the Winner</h2>
            <div className="instruction-icon  issue">
              <i className="fas fa-trophy winner"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}