import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import PropTypes from 'prop-types';
import PlatformToolRegistryTable from 'components/inventory/tools/tool_details/PlatformToolRegistryTable';
import deleteToolsActions from "components/settings/delete_tools/settings-delete-tools-action.js";

function DeleteToolDependenciesView({ selectedTool }) {

  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [relevantToolRegistries, setRelevantToolRegistries] = useState([]);
  const [loading, setLoading] = useState(false); 

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
  }, [selectedTool]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      await loadRelevantToolRegistries(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const loadRelevantToolRegistries = async (cancelSource = cancelTokenSource) => {
    if (selectedTool?._id) {
      try {
        let response = await deleteToolsActions.getRegistryUsedByTool(getAccessToken, selectedTool?._id, cancelSource);
      
        if (response?.data != null) {
          setRelevantToolRegistries(response?.data?.data);
        }
      }
      catch (error) {
        console.error(error);
        toastContext.showSystemErrorToast(error);
      }
    }
  };
    return (
        <div className="mt-2 mb-2">
        <div className="pb-2">
          <span>Deleting this Tool will terminate the instance and all the data will be permanently lost. If you proceed with deleting this tool, these <b>tool registry</b> records using this tool will break. Please review them and delete them if they are not in use anymore.</span>
        </div>
        <div className="pt-2 pb-2">
          <PlatformToolRegistryTable isLoading={loading} setIsLoading={setLoading} data={relevantToolRegistries} setData={setRelevantToolRegistries} reLoadData={loadData} />
        </div>
      </div>
    );
}

DeleteToolDependenciesView.propTypes = {
  selectedTool: PropTypes.array
};

export default DeleteToolDependenciesView;

