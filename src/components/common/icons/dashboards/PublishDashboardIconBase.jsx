import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faShareSquare} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import dashboardTemplatesActions from "components/insights/marketplace/dashboards/dashboard-template-actions";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function PublishDashboardIconBase({dashboardData, catalog, popoverText, className, icon}) {
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const addDashboardToPrivateCatalog = async (cancelSource = cancelTokenSource) => {
    try {
      await dashboardTemplatesActions.publishTemplateV2(getAccessToken, cancelSource, dashboardData.getData("_id"), catalog);
      toastContext.showFormSuccessToast("Added Dashboard to Private Catalog");
    } catch (error) {
      if (isMounted?.current === true) {
        console.log(error);
        toastContext.showServiceUnavailableDialog();
      }
    }
  };

  return (
    <div className={className}>
      <TooltipWrapper innerText={popoverText}>
        <FontAwesomeIcon
          onClick={() => {addDashboardToPrivateCatalog()}}
          icon={icon}
          fixedWidth
          className={"pointer"}
        />
      </TooltipWrapper>
    </div>
  );
}

PublishDashboardIconBase.propTypes = {
  dashboardData: PropTypes.object,
  catalog: PropTypes.string,
  popoverText: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.object
};

export default PublishDashboardIconBase;