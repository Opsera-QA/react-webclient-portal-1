import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import FieldContainer from "components/common/fields/FieldContainer";
import axios from "axios";
import LoadingIcon from "components/common/icons/LoadingIcon";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import userActions from "components/user/user-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";

function UserNameFieldBase({ userId, label, className, showLabel }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(userId) === true) {
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
  }, [userId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadUserName(cancelSource);
    } catch (error) {
      if (error?.response?.status !== 404) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserName = async (cancelSource = cancelTokenSource) => {
    const response = await userActions.getUserNameAndEmailForIdV2(
      getAccessToken,
      cancelSource,
      userId,
    );
    const userData = response?.data?.data;

    if (userData) {
      setUserData(userData);
    }
  };

  const getFormattedUserName = () => {
    if (isLoading) {
      return (
        <span>
          <LoadingIcon className={"mr-1"} />
          {userId}
        </span>
      );
    }

    if (userData == null) {
      return userId;
    }

    if (hasStringValue(userData) === true) {
      return userData;
    }

    return `${userData.name} (${userData.email})`;
  };

  const getLabel = () => {
    if (hasStringValue(label) === true) {
      return label;
    }

    return ("User ID");
  };

  const getClipboardButtons = () => {
    if (userData) {
      return (
        <div className={"d-flex"}>
          <CopyToClipboardIconBase
            copyString={userData?.email}
            copyText={`Copy User's Email ${userData?.email} to clipboard`}
            copiedText={`Copied User's Email ${userData?.email} to clipboard!`}
            className={"ml-2"}
          />
          <div className={"ml-2"}>{userId}</div>
          <CopyToClipboardIconBase
            copyString={userId}
            copyText={`Copy User ID ${userId} to clipboard`}
            copiedText={`Copied User ID ${userId} to clipboard!`}
            className={"ml-2"}
          />
        </div>
      );
    }

    if (isMongoDbId(userId) === true) {
      return (
        <div className={"d-flex"}>
          <div className={"ml-2"}>{userId}</div>
          <CopyToClipboardIconBase
            copyString={userId}
            copyText={`Copy User ID ${userId} to clipboard`}
            copiedText={`Copied User ID ${userId} to clipboard!`}
            className={"ml-2"}
          />
        </div>
      );
    }
  };

  return (
    <FieldContainer className={className}>
      <div className={"d-flex"}>
        <FieldLabelBase
          label={getLabel()}
          showLabel={showLabel}
        />
        {getFormattedUserName()}
        {getClipboardButtons()}
      </div>
    </FieldContainer>
  );
}

UserNameFieldBase.propTypes = {
  userId: PropTypes.string,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
};

export default UserNameFieldBase;