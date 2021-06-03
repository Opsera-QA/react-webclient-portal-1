import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import pipelineActions from "../../../../../../../pipeline-actions";
import axios from "axios";
import PipelineActions from "../../../../../../../pipeline-actions";

function KafkaConnectSCMToolSelectInput({dataObject, setDataObject, disabled}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [SCMList, setSCMList] = useState([]);
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
  }, [dataObject?.data?.service, disabled]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getToolsList(dataObject?.data?.service, cancelSource);
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

  const getToolsList = async (tool, cancelSource) => {
    setIsLoading(true);
      try {
        let results = await PipelineActions.getToolsListV2(getAccessToken, cancelSource, tool);
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
        setSCMList(filteredList);
      } catch (error) {
        toastContext.showErrorDialog(error);
      }
    setIsLoading(false);
    return;
  };

  return (
     <SelectInputBase
       fieldName={"gitToolId"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={SCMList ? SCMList : []}
       valueField={"id"}
       textField={"name"}
       placeholderText={"Select a Tool"}
       disabled={disabled || isLoading || SCMList.length === 0}
       busy={isLoading}
     />
  );
}

KafkaConnectSCMToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

KafkaConnectSCMToolSelectInput.defaultProps = {
  disabled : false
};
export default KafkaConnectSCMToolSelectInput;