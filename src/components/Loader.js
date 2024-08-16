import React from 'react';

function SkeletonCard() {
  return (
    <li className="card skeleton-card">
      <div className="card-header">
        <div className="skeleton-avatar skeleton"></div>
        <div className="skeleton-title skeleton"></div>
      </div>
      <div className="card-content">
        <div className="skeleton-text skeleton"></div>
        <div className="skeleton-text skeleton"></div>
        <div className="skeleton-text skeleton"></div>
        <div className="skeleton-text skeleton"></div>
      </div>
    </li>
  );
}

function Loader() {
  const skeletonCards = Array.from({ length: 10 }, (_, index) => (
    <SkeletonCard key={index} />
  ));

  return (
    <>
      <h1 className="text-center fetch">Fetching Repos...</h1>
      <ul className="repo-list skeleton-loader">{skeletonCards}</ul>
    </>
  );
}

export default Loader;
