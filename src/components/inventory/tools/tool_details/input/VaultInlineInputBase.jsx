import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import ButtonTooltip from "../../../../common/tooltip/ButtonTooltip";
import FieldContainer from "../../../../common/fields/FieldContainer";
import FieldLabel from "../../../../common/fields/FieldLabel";
import PipelineActions from "../../../../workflow/pipeline-actions";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";

function VaultInlineInputBase({ dataObject, fieldName, visible }) {
  const history = useHistory({ forceRefresh: true });
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [vaultList, setVaultList] = useState([]);
  const [isVaultSearching, setIsVaultSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchVaultDetails();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible) {
    return null;
  }

  const getVaultAccessConfigurationItems = () => {
    if (dataObject?.getData(fieldName) == null || dataObject?.getData(fieldName)?.length === 0) {
      return <span>This tool is using the Opsera provided Hashicorp Vault Instance</span>;
    }

    return isVaultSearching ? (
      <span>
        <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth /> Loading Vault Information{" "}
      </span>
    ) : vaultList &&
      vaultList.length > 1 &&
      vaultList[vaultList.findIndex((obj) => obj.id === dataObject?.getData(fieldName))] ? (
      vaultList[vaultList.findIndex((obj) => obj.id === dataObject?.getData(fieldName))].name
    ) : (
      "User Specified Vault Instance In Use"
    );
  };

  const fetchVaultDetails = async () => {
    setIsVaultSearching(true);
    try {
      let results = await PipelineActions.getToolsList("hashicorp_vault", getAccessToken);

      const filteredList = results.filter((el) => el.configuration !== undefined);
      filteredList.unshift({ id: "", name: "Opsera Default Hashicorp Vault" });
      if (filteredList) {
        setVaultList(filteredList);
      }
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsVaultSearching(false);
    }
  };

  return (
    <div className="role-access">
      <div className="d-flex">
        <div>
          <FieldContainer>
            <FieldLabel fieldName={fieldName} field={field} />
            <span className="item-field">{getVaultAccessConfigurationItems()}</span>
          </FieldContainer>
        </div>
        <div className="edit-button d-flex">
          {dataObject?.getData(fieldName) && (
            <div className={"ml-2 mt-2 text-muted"}>
              <ButtonTooltip innerText={"View Vault Configuration"}>
                <Link to={`/inventory/tools/details/${dataObject.getData(fieldName)}`} onClick={() => window.location.reload()}>
                  <span>
                    <FontAwesomeIcon icon={faTools} className="pr-1" />
                  </span>
                </Link>
              </ButtonTooltip>
            </div>
          )}
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
  type: PropTypes.string,
  helpComponent: PropTypes.object,
};

VaultInlineInputBase.defaultProps = {
  visible: true,
};

export default VaultInlineInputBase;
