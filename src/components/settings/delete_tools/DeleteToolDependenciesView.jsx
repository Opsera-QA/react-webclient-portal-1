import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import PlatformToolRegistryTable from 'components/inventory/tools/tool_details/PlatformToolRegistryTable';
import deleteToolsActions from "components/settings/delete_tools/settings-delete-tools-action.js";
import useComponentStateReference from "hooks/useComponentStateReference";

function DeleteToolDependenciesView({ selectedTool }) {
  const [relevantToolRegistries, setRelevantToolRegistries] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [selectedTool]);

  const loadData = async () => {
    try {
      setLoading(true);
      await loadRelevantToolRegistries();
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

  const loadRelevantToolRegistries = async () => {
    if (selectedTool?._id) {
      try {
        let response = await deleteToolsActions.getRegistryUsedByTool(getAccessToken, selectedTool?._id, cancelTokenSource);
      
        if (response?.data != null) {
          setRelevantToolRegistries(response?.data?.data);
        }
      }
      catch (error) {
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

