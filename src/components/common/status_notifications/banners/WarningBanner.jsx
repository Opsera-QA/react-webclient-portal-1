import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BannerBase from "components/common/status_notifications/banners/BannerBase";

function WarningBanner({warningMessage, removeBanner, id}) {
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    setMessageBody(warningMessage);
  }, [warningMessage]);

  const clearWarning = () => {
    removeBanner(id);
  };

  return (
    <BannerBase
      bannerClassName={"w-100 top-dialog-block warning-block"}
      bannerMessage={messageBody}
      removeBannerFunction={clearWarning}
    />
  );
}

WarningBanner.propTypes = {
  warningMessage: PropTypes.string,
  removeBanner: PropTypes.func,
  id: PropTypes.string,
};

export default WarningBanner;