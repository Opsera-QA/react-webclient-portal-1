import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import ModelLinkButton from "components/common/buttons/link/ModelLinkButton";
import {faSearch} from "@fortawesome/pro-light-svg-icons";

function LinkCard({dataModel, textField, icon, className }) {
  return (
    <div className={className}>
      <div className="px-2 justify-content-between d-flex w-100">
        <span><IconBase className={"mr-2"} icon={icon} />{dataModel.getData(textField)}</span>
        <ModelLinkButton icon={faSearch} dataModel={dataModel} />
      </div>
    </div>
  );
}

LinkCard.propTypes = {
  dataModel: PropTypes.object,
  icon: PropTypes.object,
  className: PropTypes.string,
  textField: PropTypes.string,
};

export default React.memo(LinkCard);