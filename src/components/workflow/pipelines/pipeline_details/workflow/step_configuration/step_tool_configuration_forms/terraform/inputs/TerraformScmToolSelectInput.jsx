import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import pipelineActions from "components/workflow/pipeline-actions";

function TerraformScmToolSelectInput({dataObject, setDataObject, disabled, type}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [scmList, setScmList] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setScmList([]);
    if (type && type !== "") {
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
  }, [type]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getToolsList(dataObject?.data?.type, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getToolsList = async (tool, cancelSource) => {
    const response = await pipelineActions.getToolsListV2(getAccessToken, cancelSource, tool);
    const data = response?.data;

    if (Array.isArray(data) && data.length > 0) {
      let filteredArray = [];
      data.map((item) => {
        if (item.configuration == null) {
          return;
        }

        filteredArray.push({
          name: item.name,
          id: item._id,
          configuration: item.configuration,
          accounts: item.accounts,
          jobs: item.jobs,
        });
      });

      setScmList([...filteredArray]);
    }
  };

  return (
     <SelectInputBase
       fieldName={"gitToolId"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={scmList ? scmList : []}
       valueField={"id"}
       textField={"name"}
       placeholderText={"Select a Tool"}
       disabled={type == null || type === "" || disabled || isLoading || scmList.length === 0}
       busy={isLoading}
     />
  );
}

TerraformScmToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string
};

export default TerraformScmToolSelectInput;