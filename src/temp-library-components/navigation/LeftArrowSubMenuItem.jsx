import React from "react";
import IconBase from "components/common/icons/IconBase";
import {faArrowLeft} from "@fortawesome/pro-light-svg-icons";
import {SubMenuItem} from "@opsera/react-vanity-set";
import PropTypes from "prop-types";

export default function LeftArrowSubMenuItem({ onClickFunction }) {
  return (
    <SubMenuItem
      className={"px-3"}
      itemKey={"back_button"}
      activeKey={"not_back_button"}
      setActiveKey={onClickFunction}
      label={<IconBase iconSize={"lg"} icon={faArrowLeft} />}
    />
  );
}

LeftArrowSubMenuItem.propTypes = {
  onClickFunction: PropTypes.func,
};
