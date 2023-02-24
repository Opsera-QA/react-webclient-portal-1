import React from "react";
import PropTypes from "prop-types";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import OpseraBirdLoadingImage from "temp-library-components/loader/OpseraBirdLoadingImage";
import LoadingIcon from "components/common/icons/LoadingIcon";

export default function CenterLoadingIndicator(
  {
    customMessage,
    minHeight,
    type,
  }) {
  const getLoadingMessage = () => {
    if (hasStringValue(customMessage) === true) {
      return customMessage;
    }

    return `Loading ${type}`;
  };

  return (
    <CenteredContentWrapper
      minHeight={minHeight}
    >
      <div>
        <div
          // style={{
          //   marginTop: "-120px",
          // }}
          className={"d-flex"}
        >
          <div className={"mx-auto"}>
            <OpseraBirdLoadingImage />
          </div>
        </div>
        <div className={"d-flex"}>
          <LoadingIcon iconSize={"xl"} className={"mr-3 my-auto"} />
          <div
            style={{
              fontSize: "1.2rem",
              letterSpacing: "2px",
            }}
          >
            {getLoadingMessage()}
          </div>
        </div>
      </div>
    </CenteredContentWrapper>
  );
}

CenterLoadingIndicator.propTypes = {
  customMessage: PropTypes.string,
  type: PropTypes.string,
  minHeight: PropTypes.string,
};

CenterLoadingIndicator.defaultProps = {
  type: "Data",
  minHeight: "200px",
};