import React from 'react';

function LanguageBtnHeader(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <header>
      <nav className="center language-nav">
        {languages.map((language) => {
          return (
            <button
              key={language}
              className={props.value === language ? 'active' : ''}
              onClick={props.handleClick}
            >
              {language}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default LanguageBtnHeader;