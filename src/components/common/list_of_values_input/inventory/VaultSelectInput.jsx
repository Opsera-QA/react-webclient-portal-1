import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import PipelineActions from "components/workflow/pipeline-actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faTools } from "@fortawesome/free-solid-svg-icons";

function VaultToolSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [vaultList, setVaultList] = useState([]);
  const [isVaultSearching, setIsVaultSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Vault Instance");

  useEffect(() => {
    loadData();

  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchVaultDetails();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <Link to={`/inventory/tools/details/${dataObject.getData(fieldName)}`}>
          <span><FontAwesomeIcon icon={faTools} className="pr-1" />View Or Edit this Tool&apos;s Registry settings</span>
        </Link>
      );
    }
    return <span>Select a tool to get started.</span>;
  };


  const fetchVaultDetails = async () => {
    setIsVaultSearching(true);
    try {
      let results = await PipelineActions.getToolsList("hashicorp_vault", getAccessToken);

      const filteredList = results.filter((el) => el.configuration !== undefined);
      filteredList.unshift({ id: "default", name: "Opsera Default Hashicorp Vault"});
      if (filteredList) {
        setVaultList(filteredList);
      }
    } catch(error) {
      setPlaceholder("No User Vault Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsVaultSearching(false);
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={vaultList ? vaultList : []}
        busy={isVaultSearching}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (vaultList == null || vaultList.length === 0))}
      />
      <small className="text-muted ml-3">
        {getInfoText()}
      </small>
    </div>
  );
}

VaultToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

VaultToolSelectInput.defaultProps = {
  valueField: "id",
  textField: "name",
  fieldName: "vaultToolConfigId"
};

export default VaultToolSelectInput;