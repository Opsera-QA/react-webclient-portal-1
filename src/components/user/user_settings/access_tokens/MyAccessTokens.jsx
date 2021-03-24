import React, {useContext, useEffect, useRef, useState} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import AccessTokenTable from "components/user/user_settings/access_tokens/AccessTokenTable";
import AccessTokenEditorPanel from "components/user/user_settings/access_tokens/details/AccessTokenEditorPanel";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import AccessTokenLogPanel from "components/user/user_settings/access_tokens/details/logs/AccessTokenLogPanel";
import Model from "core/data_model/model";
import accessTokenFilterMetadata from "components/user/user_settings/access_tokens/access-token-filter-metadata";

function MyAccessTokens() {
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [accessTokenFilterModel, setAccessTokenFilterModel] = useState(new Model({...accessTokenFilterMetadata.newObjectFields}, accessTokenFilterMetadata, false));
  const [isLoading, setIsLoading] = useState(true);
  const [accessTokens, setAccessTokens] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [activeTab, setActiveTab] = useState("summary");

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
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource, filterModel = accessTokenFilterModel) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource, filterModel);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource, filterModel = accessTokenFilterModel) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getAccessTokens(cancelSource, filterModel);
    }
  };

  const getAccessTokens = async (cancelSource = cancelTokenSource, filterModel = accessTokenFilterModel) => {
    try {
      const accessTokenResponse = await tokenActions.getTokens(getAccessToken, cancelSource, filterModel);
      const tokens = accessTokenResponse?.data?.data;

      if (isMounted?.current === true && tokens) {
        setAccessTokens(tokens);
        let newFilterModel = filterModel;
        newFilterModel.setData("totalCount", accessTokenResponse?.data?.count);
        newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
        setAccessTokenFilterModel({...newFilterModel});
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab activeTab={activeTab} handleTabClick={handleTabClick} />
        <CustomTab activeTab={activeTab} tabText={"Token Activity Log"} handleTabClick={handleTabClick} tabName={"logs"} icon={faTable}/>
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <>
            <AccessTokenEditorPanel cancelTokenSource={cancelTokenSource} loadData={loadData} />
            <AccessTokenTable
              loadData={loadData}
              isLoading={isLoading}
              accessTokenData={accessTokens}
              isMounted={isMounted}
              cancelTokenSource={cancelTokenSource}
              filterModel={accessTokenFilterModel}
              setFilterModel={setAccessTokenFilterModel}
            />
          </>
        );
      case "logs":
        return <AccessTokenLogPanel />;
      default:
        return null;
    }
  };

  return (<div className="px-3"><TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} /></div>);
}

export default MyAccessTokens;

