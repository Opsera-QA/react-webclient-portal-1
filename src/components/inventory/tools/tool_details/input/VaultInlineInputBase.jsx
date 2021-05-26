import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonTooltip from "../../../../common/tooltip/ButtonTooltip";
import FieldContainer from "../../../../common/fields/FieldContainer";
import FieldLabel from "../../../../common/fields/FieldLabel";
import PipelineActions from "../../../../workflow/pipeline-actions";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";
import { faSpinner, faTools } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";

function VaultInlineInputBase({ dataObject, fieldName, visible, disabled }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [vaultList, setVaultList] = useState([]);
  const [isVaultSearching, setIsVaultSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchVaultDetails(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  if (!visible) {
    return null;
  }

  const fetchVaultDetails = async (cancelSource) => {
    setIsVaultSearching(true);
    try {
      let results = await PipelineActions.getToolsListV2(getAccessToken, cancelSource, "hashicorp_vault");
      if (results.data) {
        let respObj = [];
        let arrOfObj = results.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            accounts: item.accounts,
            jobs: item.jobs,
          });
        });
        results = respObj;
      }
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


  const getVaultAccessConfigurationItems = () => {
    if (dataObject?.getData(fieldName) == null || dataObject?.getData(fieldName)?.length === 0) {
      return <span>This tool is using the Opsera provided Hashicorp Vault Instance</span>;
    }

    if (isVaultSearching) {
      return (
        <span>
          <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth /> Loading Vault Information
        </span>
      );
    }

    if (Array.isArray(vaultList) && vaultList.length > 1) {
      const currentValue = dataObject?.getData(fieldName);
      const foundObjectIndex = vaultList.findIndex((obj) => obj.id === currentValue);
      const foundObject = vaultList[foundObjectIndex];

      if (foundObject) {
        return foundObject.name;
      }
    }
    return "User Specified Vault Instance In Use";
  };

  const getToolDetailsButton = () => {
    if (dataObject?.getData(fieldName)) {
      return (
        <div className={"ml-2 mt-2 text-muted"}>
          <ButtonTooltip innerText={"View Vault Configuration"}>
            <Link
              to={`/inventory/tools/details/${dataObject.getData(fieldName)}`}
              onClick={() => window.location.reload()}
            >
              <span>
                <FontAwesomeIcon icon={faTools} className="pr-1" />
              </span>
            </Link>
          </ButtonTooltip>
        </div>
      );
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
          {getToolDetailsButton()}
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
  helpComponent: PropTypes.object
};

VaultInlineInputBase.defaultProps = {
  visible: true,
  disabled: false
};

export default VaultInlineInputBase;
