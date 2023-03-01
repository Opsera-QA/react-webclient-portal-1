import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import OpseraBirdLoadingImage from "temp-library-components/loader/OpseraBirdLoadingImage";
import LoadingIcon from "components/common/icons/LoadingIcon";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

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
      <CenterLoadingIndicator
        minHeight={"250px"}
        customMessage={getMessage()}
      />
    );
  }

  //same layout as sm, but larger animated icon
  if (type === "md") {
    return (
      <CenterLoadingIndicator
        minHeight={"250px"}
        customMessage={getMessage()}
      />
    );
  }

  return (
    <div className={"loading d-flex"}>
      <div
        style={{
          position: "relative",
          top: "-75px"
        }}
        className={"m-auto"}
      >
        <div>
          <OpseraBirdLoadingImage/>
        </div>
      </div>
    </div>
  );
}

LoadingDialog.propTypes = {
  size: PropTypes.string,
  message: PropTypes.string
};


export default LoadingDialog;