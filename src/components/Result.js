import React from "react";
import { withRouter } from "../utils/withRouter";
import { Link } from "react-router-dom";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: null,
      playerTwo: null,
    };
  }
  componentDidMount() {
    let playerOne = this.props.params.player.split("&&")[0];
    let playerTwo = this.props.params.player.split("&&")[1];
    fetch(`https://api.github.com/users/${playerOne}`)
      .then((res) => res.json())
      .then((playerOne) => this.setState({ playerOne }));
    fetch(`https://api.github.com/users/${playerTwo}`)
      .then((res) => res.json())
      .then((playerTwo) => this.setState({ playerTwo }));
  }
  render() {
    let playerOne = this.state.playerOne;
    console.log(playerOne);
    let playerTwo = this.state.playerTwo;
    console.log(playerTwo);
    let score1 = !playerOne ? 0 : playerOne.followers + playerOne.public_repos;
    let score2 = !playerTwo ? 0 : playerTwo.followers + playerTwo.public_repos;

    if (!this.state.playerOne || !this.state.playerTwo) {
      return <h1 className="text-center">Battling...</h1>;
    }
    return (
        <>
      <div className="battling-players grid space-around container-sm">
        <div className="winner-info text-center">
          <h2>{score1 > score2 ? "Winner🥳" : (score1 === score2 ? 'Tie🙂' : 'Loser🙁')}</h2>
          <img src={playerOne.avatar_url} alt="" />
          <h2 className="score">Score: {score1}</h2>
          <h3 className="username">{playerOne.login}</h3>
          <p>
              <i className="fas fa-user result-user"></i>
              {playerOne.name}
            </p>
            <p>
            <i className="fa-sharp fas fa-location-arrow result-location"></i>
              {playerOne.location}
            </p>
            <p>
          <i className="fas fa-users followers result-follower"></i>
          {playerOne.followers} Followers
        </p>
        <p>
          <i className="fas fa-users following result-following"></i>
          {playerOne.following} Following
        </p>
         <p>
          <i className="fas fa-code-branch ligt-black result-repo"></i>
          {playerOne.public_repos} repositories
        </p>
        </div>
        <div className="winner-info text-center">
          <h2>{score1 < score2 ? "Winner🥳" : (score1 === score2 ? 'Tie🙂' : 'Loser🙁')}</h2>
          <img src={playerTwo.avatar_url} alt="" />
          <h2 className="score">Score: {score2}</h2>
          <h3 className="username">{playerTwo.login}</h3>
          <p>
              <i className="fas fa-user result-user"></i>
              {playerTwo.name}
            </p>
            <p>
            <i className="fa-sharp fas fa-location-arrow result-location"></i>
              {playerTwo.location}
            </p>
            <p>
          <i className="fas fa-users followers result-follower"></i>
          {playerTwo.followers} Followers
        </p>
        <p>
          <i className="fas fa-users following result-following"></i>
          {playerTwo.following} Following
        </p>
        <p>
          <i className="fas fa-code-branch ligt-black result-repo"></i>
          {playerTwo.public_repos} repositories
        </p>
        </div>
      </div>
      <div className="text-center battle-btn">
      <Link to='/battle'>
      <button>Reset</button> 
      </Link>
      </div>
       </>
    );
  }
}

export default withRouter(Result);