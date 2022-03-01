import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function RefreshButton({ isLoading, loadData, variant, size, className }) {
  if (!loadData) {
    return null;
  }

  return (
    <div className={className}>
      <Button variant={variant} size={size} disabled={isLoading} onClick={() => {loadData();}}>
        <span><IconBase spinIcon={isLoading} icon={faSync}/></span>
      </Button>
    </div>
  );
}

RefreshButton.propTypes = {
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string
};

RefreshButton.defaultProps = {
  variant: "outline-primary",
  size: "sm"
};

export default RefreshButton;