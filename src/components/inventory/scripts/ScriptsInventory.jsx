import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ScriptsView from "components/inventory/scripts/ScriptsView";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import ScriptsFilterModel from "components/inventory/scripts/scripts.filter.model";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import ScriptsHelpDocumentation from "../../common/help/documentation/tool_registry/ScriptsHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";
import ScriptLibraryRoleHelper from "@opsera/know-your-role/roles/registry/script_library/scriptLibraryRole.helper";
import useGetScriptModel from "components/inventory/scripts/hooks/useGetScriptModel";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function ScriptsInventory() {
  const [isLoading, setLoading] = useState(false);
  const [scriptList, setScriptList] = useState([]);
  const [scriptFilterModel, setScriptFilterModel] = useState(new ScriptsFilterModel());
  const [scriptModel, setScriptModel] = useState(undefined);
  const {
    isMounted,
    userData,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();
  const {
    getNewScriptModel,
  } = useGetScriptModel();

  useEffect(() => {
    if (ScriptLibraryRoleHelper.canGetScriptLibrary(userData) === true) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, []);

  const loadData = async (filterModel = scriptFilterModel, selectedItemId) => {
    try {
      setLoading(true);
      await getScripts(filterModel, selectedItemId);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getScripts = async (filterModel = scriptFilterModel, selectedItemId) => {
    const response = await scriptsActions.getScripts(
      getAccessToken,
      cancelTokenSource,
      filterModel?.getData("search"),
    );
    const scripts = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(scripts)) {
      if (isMongoDbId(selectedItemId) === true) {
        const foundScript = scripts.find((script) => script._id === selectedItemId);

        if (foundScript) {
          const newModel = getNewScriptModel(
            foundScript,
            false,
            setScriptModel,
            loadData,
          );

          setScriptModel({ ...newModel });
        }
      }

      setScriptList([...scripts]);
      filterModel.setData("totalCount", response.data.count);
      filterModel.setData("activeFilters", filterModel.getActiveFilters());
      setScriptFilterModel({ ...filterModel });
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<InventorySubNavigationBar currentTab={"scripts"} />}
      breadcrumbDestination={"scripts"}
      pageDescription={`
        The Opsera Scripts Library enables user to register a new script, give it a name and apply RBAC. The script can then be referenced in the a pipeline step.
      `}
      helpComponent={<ScriptsHelpDocumentation />}
    >
      <ScriptsView
        isLoading={isLoading}
        loadData={loadData}
        scriptList={scriptList}
        setScriptList={setScriptList}
        scriptFilterModel={scriptFilterModel}
        scriptModel={scriptModel}
        setScriptModel={setScriptModel}
      />
    </ScreenContainer>
  );
}

ScriptsInventory.propTypes = {};

export default ScriptsInventory;