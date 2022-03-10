import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BannerBase from "components/common/status_notifications/banners/BannerBase";

function SuccessBanner({successMessage, removeBanner, id}) {
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    setMessageBody(successMessage);
  }, [successMessage]);

  const clearSuccess = () => {
    removeBanner(id);
  };

  return (
    <BannerBase
      bannerClassName={"py-3 w-100 top-dialog-block success-block"}
      bannerMessage={messageBody}
      removeBannerFunction={clearSuccess}
    />
  );
}

SuccessBanner.propTypes = {
  successMessage: PropTypes.string,
  removeBanner: PropTypes.func,
  id: PropTypes.string,
};

export default SuccessBanner;