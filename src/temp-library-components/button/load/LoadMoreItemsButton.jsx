import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useApiState from "hooks/general/api/useApiState";
import {faDownload} from "@fortawesome/pro-light-svg-icons";

export default function LoadMoreItemsButton(
  {
    hasMoreItems,
    loadMoreItems,
  }) {
  const { apiState, apiStateFunctions } = useApiState();

  const handleLoadFunction = async () => {
    apiStateFunctions.setBusyState();
    await loadMoreItems();
    apiStateFunctions.setReadyState();
  };

  if (hasMoreItems !== true || loadMoreItems == null) {
    return null;
  }

  return (
    <VanityButtonBase
      className={"mx-auto"}
      onClickFunction={handleLoadFunction}
      normalText={"Load More Items"}
      busyText={"Loading More Items"}
      variant={"link"}
      buttonState={apiState}
      icon={faDownload}
    />
  );
}

LoadMoreItemsButton.propTypes = {
  hasMoreItems: PropTypes.bool,
  loadMoreItems: PropTypes.func,
};
