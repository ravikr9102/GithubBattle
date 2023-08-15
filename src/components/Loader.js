function Loader() {
    return (
      <>
        <h1 className="text-center fetch">Fetching Repos...</h1>
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    );
  }
  
  export default Loader;