import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import { unsecuredItemReportActions } from "components/settings/unsecured_items/unsecuredItemReport.actions";
import Model from "core/data_model/model";
import UnsecuredItemReportViews from "components/settings/unsecured_items/UnsecuredItemReportViews";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import UnsecuredItemReportSubNavigationBar
  from "components/settings/unsecured_items/UnsecuredItemReportSubNavigationBar";
import {
  unsecureItemsReportFilterMetadata
} from "components/settings/unsecured_items/unsecuredItemReportFilter.metadata";

function UnsecuredItemReport() {
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [itemFilterModel, setItemFilterModel] = useState(
    new Model({ ...unsecureItemsReportFilterMetadata.newObjectFields }),
  );
  const {
    isMounted,
    cancelTokenSource,
    accessRoleData,
    toastContext,
    isSiteAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    if (isSiteAdministrator === true) {
      loadData(itemFilterModel).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [isSiteAdministrator]);

  const loadData = async (
    itemFilterModel,
  ) => {
    try {
      setItems([]);
      setIsLoading(true);
      const unassignedItemsData =
        await unsecuredItemReportActions.getUnassingedRulesItems(
          getAccessToken,
          cancelTokenSource,
          itemFilterModel,
        );
      const newItemList = DataParsingHelper.parseArray(unassignedItemsData?.data?.message?.data, []);

      if (isMounted?.current === true) {
        setItems([...newItemList]);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  if (isSiteAdministrator !== true) {
    console.log("isSiteAdministor is false");
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"unsecuredItemReport"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      navigationTabContainer={
        <UnsecuredItemReportSubNavigationBar activeTab={"unsecuredItemReport"} />
      }
    >
      <UnsecuredItemReportViews
        items={items}
        itemFilterModel={itemFilterModel}
        setItemsFilterModel={setItemFilterModel}
        loadData={loadData}
        isLoading={isLoading}
        isMounted={isMounted}
      />
    </ScreenContainer>
  );
}

export default UnsecuredItemReport;
