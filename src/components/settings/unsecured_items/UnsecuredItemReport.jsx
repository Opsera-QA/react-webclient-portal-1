import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
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
import {accountSettingsTrails} from "components/settings/accountSettings.trails";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";

function UnsecuredItemReport() {
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [itemFilterModel, setItemFilterModel] = useState(
    new Model({ ...unsecureItemsReportFilterMetadata.newObjectFields }),
  );
  const {
    userData,
    isMounted,
    cancelTokenSource,
    accessRoleData,
    toastContext,
  } = useComponentStateReference();
  const breadcrumb = accountSettingsTrails.unsecuredItemReport;

  useEffect(() => {
    if (RoleHelper.doesUserMeetSiteRoleRequirements(userData, breadcrumb?.allowedRoles) === true) {
      loadData(itemFilterModel).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [userData]);

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

  return (
    <ScreenContainer
      breadcrumbDestination={"unsecuredItemReport"}
      accessRoleData={accessRoleData}
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
