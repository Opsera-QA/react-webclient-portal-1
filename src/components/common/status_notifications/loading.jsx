import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import OpseraBirdLoadingImage from "temp-library-components/loader/OpseraBirdLoadingImage";

function LoadingDialog({size, message}) {
  const [type, setType] = useState({});

  useEffect(() => {
    setType(size);
  }, [size]);

  const getMessage = () => {
    if (message) {
      return message;
    }
  };

  if (type === "sm") {
    return (
      <div className="row" style={{height: "250px", width: "100%"}}>
        <div className="col-sm-12 my-auto text-center text-muted" style={{fontSize: "larger"}}>
          <OpseraBirdLoadingImage/>
          {getMessage()}
        </div>
      </div>
    );
  }

  //same layout as sm, but larger animated icon
  if (type === "md") {
    return (
      <div className="row" style={{height: "250px", width: "100%"}}>
        <div className="col-sm-12 my-auto text-center text-muted" style={{fontSize: "1.3em"}}>
          <OpseraBirdLoadingImage/>
          {getMessage()}
        </div>
      </div>
    );
  }

  return (
    <div className={"loading d-flex"}>
      <div className={"m-auto"}>
        <OpseraBirdLoadingImage/>
      </div>
    </div>
  );
}

LoadingDialog.propTypes = {
  size: PropTypes.string,
  message: PropTypes.string
};


export default LoadingDialog;