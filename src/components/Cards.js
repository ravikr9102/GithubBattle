import React from "react";

function Cards(props) {
  let data = props.Data;
  return (
    <ul className="repo-list">
      {data.map((userData, index) => {
        return (
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <li key={index} className="card">
              <div className="card-header">
                <h4>#{index + 1}</h4>
                <figure>
                  <img src={userData.owner.avatar_url} alt="user profile" />
                </figure>
                <h5>{userData.name}</h5>
              </div>
              <div className="card-content">
                <p>
                  <i className="fas fa-user"></i>
                  {userData.name}
                </p>
                <p className="star">
                  <i className="fas fa-star"></i>
                  {userData.stargazers_count} stars
                </p>
                <p className="fork">
                  <i className="fas fa-code-branch"></i>
                  {userData.forks} forks
                </p>
                <p className="issue">
                  <i className="fas fa-exclamation-triangle"></i>
                  {userData.open_issues} open issues
                </p>
              </div>
            </li>
          </a>
        );
      })}
    </ul>
  );
}

export default Cards;
