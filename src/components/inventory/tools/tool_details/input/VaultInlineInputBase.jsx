import React, { useState} from "react";
import PropTypes from "prop-types";
import VaultAccessField from "./VaultInputAccessField";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import ButtonTooltip from "../../../../common/tooltip/ButtonTooltip";

function VaultInlineInputBase({dataObject, fieldName ,visible, noDataMessage}) {
  const history = useHistory({forceRefresh:true});

  if (!visible) {
    return null;
  }

  const viewConfig = () => {
    history.push(`/inventory/tools/details/${dataObject.getData(fieldName)}`);
    history.go(0); // to change this later
  };

  return (
    <div className="role-access">
      <div className="d-flex">
        <div><VaultAccessField dataObject={dataObject} fieldName={fieldName} noDataMessage={noDataMessage} /></div>
        <div className="edit-button d-flex">
          { dataObject.getData(fieldName) &&
            <div className={"ml-2 mt-2 text-muted"}>
            <ButtonTooltip innerText={"View Vault Configuration"}>
              <FontAwesomeIcon
                onClick={() => viewConfig()}
                icon={faTools}
                fixedWidth
              />
            </ButtonTooltip>
          </div>}
        </div>
      </div>
    </div>
  );
}

VaultInlineInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  saveData: PropTypes.func,
  noDataMessage: PropTypes.any,
  type: PropTypes.string,
  helpComponent: PropTypes.object,
};

VaultInlineInputBase.defaultProps = {
  visible: true
};

export default VaultInlineInputBase;