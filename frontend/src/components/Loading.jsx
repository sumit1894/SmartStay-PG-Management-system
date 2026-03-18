import "../style/Loading.css"

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Loader;