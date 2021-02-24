import React, {useContext, useState, useEffect, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";
import PipelineCatalog from "components/workflow/catalog/PipelineCatalog";

function PipelineCatalogLibrary() {
  const { setAccessRoles, getAccessToken, getUserRecord } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [activeTemplates, setActiveTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessRoleData, setAccessRoleData] = useState(null);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await loadInUseIds(cancelSource);
    }
  };

  const loadInUseIds = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getInUseTemplatesV2(getAccessToken, cancelSource);

    if (isMounted?.current === true && response?.data) {
      setActiveTemplates(response.data);
    }
  };

  return (<PipelineCatalog source={activeTab === "customer" ? activeTab : undefined} activeTemplates={activeTemplates} />);
}

PipelineCatalogLibrary.propTypes = {};

export default PipelineCatalogLibrary;
