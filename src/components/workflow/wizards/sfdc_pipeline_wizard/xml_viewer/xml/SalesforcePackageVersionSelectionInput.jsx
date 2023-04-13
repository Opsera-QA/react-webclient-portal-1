import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import sfdcPipelineActions from "../../sfdc-pipeline-actions";
import SelectInputBase from "../../../../../common/inputs/select/SelectInputBase";
import LoadingIcon from "../../../../../common/icons/LoadingIcon";

function SalesforcePackageVersionSelectionInput({ fieldName, pipelineWizardModel, setPipelineWizardModel, disabled }) {
  const { getAccessToken } = useContext(AuthContext);
  const [apiVersions, setApiVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getSfdcApiVersion(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setErrorMessage("Could Not Load API versions");
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  if(isLoading) {
    return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading</div>;
  }
  const getSfdcApiVersion = async (cancelSource = cancelTokenSource) => {
    setApiVersions([]);
    const response = await sfdcPipelineActions.getApiVersions(getAccessToken, cancelSource, pipelineWizardModel.getData("sfdcToolId"));
    setApiVersions(response?.data?.message);
  };

  const getVersionSelectionView = () => {
    if (apiVersions && apiVersions.length > 0 ) {
      return (
        <SelectInputBase
          fieldName={fieldName}
          selectOptions={apiVersions}
          dataObject={pipelineWizardModel}
          setDataObject={setPipelineWizardModel}
          defaultValue={apiVersions[0]}
          busy={isLoading}
          placeholderText={"Select API Version"}
          disabled={disabled}
        />
      );
    }

    return (<div className={"m-2"}>No Versions Found, Will use latest API version for deployment</div>);
  };

  return (
    getVersionSelectionView()
  );
}
SalesforcePackageVersionSelectionInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineWizardModel: PropTypes.any,
  setPipelineWizardModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforcePackageVersionSelectionInput;