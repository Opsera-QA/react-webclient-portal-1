import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "components/common/icons/general/CloseIcon";

function BannerBase (
  {
    bannerClassName,
    bannerMessage,
    removeBannerFunction,
  }) {
  const getCloseButton = () => {
    if (removeBannerFunction) {
      return (
        <div className={"ml-auto my-auto"}>
          <CloseIcon
            handleCloseFunction={removeBannerFunction}
            size={"lg"}
          />
        </div>
      );
    }
  };

  return (
    <div className={bannerClassName}>
      <div className={"px-3 d-flex"}>
        <div>{bannerMessage}</div>
        {getCloseButton()}
      </div>
    </div>
  );
}

BannerBase.propTypes = {
  bannerClassName: PropTypes.string,
  bannerMessage: PropTypes.any,
  removeBannerFunction: PropTypes.func,
};

export default BannerBase;