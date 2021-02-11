import React, {useContext, useEffect, useRef, useState} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import {useParams} from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import AccessTokenTable from "components/user/user_settings/access_tokens/AccessTokenTable";

function MyAccessTokens() {
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [accessTokens, setAccessTokens] = useState([]);
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

  return (<AccessTokenTable loadData={loadData} isLoading={isLoading} data={accessTokens}/>);
}

export default MyAccessTokens;

