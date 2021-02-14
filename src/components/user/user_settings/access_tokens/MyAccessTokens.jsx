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
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";

function MyAccessTokens() {
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
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
    }
  }, []);

  const loadData = async (cancelSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getAccessTokens(cancelSource);
      }
    }
  };

  const getAccessTokens = async (cancelSource) => {
    try {
      const accessTokenResponse = await tokenActions.getTokens(getAccessToken, cancelSource);
      const tokens = accessTokenResponse?.data?.data;

      if (isMounted?.current === true && tokens) {
        setAccessTokens(tokens);
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
            <div className="mb-3 mx-2">
              <AccessTokenEditorPanel cancelTokenSource={cancelTokenSource} />
            </div>
            <AccessTokenTable loadData={loadData} isLoading={isLoading} data={accessTokens} isMounted={isMounted} cancelTokenSource={cancelTokenSource} />
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

