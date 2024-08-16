// import React from "react";
// import { withRouter } from "../utils/withRouter";
// import { Link } from "react-router-dom";
// import Confetti from "react-confetti";

// class Result extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       playerOne: null,
//       playerTwo: null,
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };
//   }

//   componentDidMount() {
//     let playerOne = this.props.params.player.split("&&")[0];
//     let playerTwo = this.props.params.player.split("&&")[1];
//     fetch(`https://api.github.com/users/${playerOne}`)
//       .then((res) => res.json())
//       .then((playerOne) => this.setState({ playerOne }));
//     fetch(`https://api.github.com/users/${playerTwo}`)
//       .then((res) => res.json())
//       .then((playerTwo) => this.setState({ playerTwo }));

//     window.addEventListener("resize", this.handleResize);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("resize", this.handleResize);
//   }

//   handleResize = () => {
//     this.setState({ width: window.innerWidth, height: window.innerHeight });
//   };

//   render() {
//     let { playerOne, playerTwo, width, height } = this.state;
//     let score1 = !playerOne ? 0 : playerOne.followers + playerOne.public_repos;
//     let score2 = !playerTwo ? 0 : playerTwo.followers + playerTwo.public_repos;

//     if (!playerOne || !playerTwo) {
//       return <h1 className="text-center">Battling...</h1>;
//     }

//     let confettiTrigger = score1 !== score2;

//     return (
//       <>
//         {confettiTrigger && <Confetti width={width} height={height} />}
//         <div className="battling-players">
//           <div className="winner-info text-center">
//             <h2>
//               {score1 > score2
//                 ? "Winner🥳"
//                 : score1 === score2
//                 ? "Tie🙂"
//                 : "Loser🙁"}
//             </h2>
//             <img src={playerOne.avatar_url} alt="Player One" />
//             <h2 className="score">Score: {score1}</h2>
//             <h3 className="username">{playerOne.login}</h3>
//             <p>
//               <i className="fas fa-user result-user"></i>
//               {playerOne.name}
//             </p>
//             <p>
//               <i className="fa-sharp fas fa-location-arrow result-location"></i>
//               {playerOne.location}
//             </p>
//             <p>
//               <i className="fas fa-users followers result-follower"></i>
//               {playerOne.followers} Followers
//             </p>
//             <p>
//               <i className="fas fa-users following result-following"></i>
//               {playerOne.following} Following
//             </p>
//             <p>
//               <i className="fas fa-code-branch ligt-black result-repo"></i>
//               {playerOne.public_repos} repositories
//             </p>
//           </div>
//           <div className="winner-info text-center">
//             <h2>
//               {score1 < score2
//                 ? "Winner🥳"
//                 : score1 === score2
//                 ? "Tie🙂"
//                 : "Loser🙁"}
//             </h2>
//             <img src={playerTwo.avatar_url} alt="Player Two" />
//             <h2 className="score">Score: {score2}</h2>
//             <h3 className="username">{playerTwo.login}</h3>
//             <p>
//               <i className="fas fa-user result-user"></i>
//               {playerTwo.name}
//             </p>
//             <p>
//               <i className="fa-sharp fas fa-location-arrow result-location"></i>
//               {playerTwo.location}
//             </p>
//             <p>
//               <i className="fas fa-users followers result-follower"></i>
//               {playerTwo.followers} Followers
//             </p>
//             <p>
//               <i className="fas fa-users following result-following"></i>
//               {playerTwo.following} Following
//             </p>
//             <p>
//               <i className="fas fa-code-branch ligt-black result-repo"></i>
//               {playerTwo.public_repos} repositories
//             </p>
//           </div>
//         </div>
//         <div className="text-center battle-btn">
//           <Link to="/battle">
//             <button>Reset</button>
//           </Link>
//         </div>
//       </>
//     );
//   }
// }

// export default withRouter(Result);



import React from "react";
import { withRouter } from "../utils/withRouter";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: null,
      playerTwo: null,
      width: window.innerWidth,
      height: window.innerHeight,
      loading: true, // New loading state
    };
  }

  componentDidMount() {
    let playerOne = this.props.params.player.split("&&")[0];
    let playerTwo = this.props.params.player.split("&&")[1];

    Promise.all([
      fetch(`https://api.github.com/users/${playerOne}`).then((res) => res.json()),
      fetch(`https://api.github.com/users/${playerTwo}`).then((res) => res.json())
    ])
    .then(([playerOneData, playerTwoData]) => {
      this.setState({
        playerOne: playerOneData,
        playerTwo: playerTwoData,
        loading: false // Set loading to false when data is fetched
      });
    });

    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    let { playerOne, playerTwo, width, height, loading } = this.state;
    let score1 = !playerOne ? 0 : playerOne.followers + playerOne.public_repos;
    let score2 = !playerTwo ? 0 : playerTwo.followers + playerTwo.public_repos;

    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      );
    }

    let confettiTrigger = score1 !== score2;

    return (
      <>
        {confettiTrigger && <Confetti width={width} height={height} />}
        <div className="battling-players">
          <div className="winner-info text-center">
            <h2>
              {score1 > score2
                ? "Winner🥳"
                : score1 === score2
                ? "Tie🙂"
                : "Loser🙁"}
            </h2>
            <img src={playerOne.avatar_url} alt="Player One" />
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
            <h2>
              {score1 < score2
                ? "Winner🥳"
                : score1 === score2
                ? "Tie🙂"
                : "Loser🙁"}
            </h2>
            <img src={playerTwo.avatar_url} alt="Player Two" />
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
          <Link to="/battle">
            <button>Reset</button>
          </Link>
        </div>
      </>
    );
  }
}

export default withRouter(Result);

