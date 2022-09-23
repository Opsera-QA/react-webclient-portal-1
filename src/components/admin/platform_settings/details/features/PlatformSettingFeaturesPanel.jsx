import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import { platformSettingFeatureActions }
  from "components/admin/platform_settings/details/features/platformSettingFeature.actions";
import {
  platformSettingFeatureMetadata
} from "components/admin/platform_settings/details/features/platformSettingFeature.metadata";
import PlatformSettingFeatureEditorPanel
  from "components/admin/platform_settings/details/features/PlatformSettingFeatureEditorPanel";
import PlatformSettingFeatureTable
  from "components/admin/platform_settings/details/features/PlatformSettingFeatureTable";

export default function PlatformSettingFeaturesPanel({ platformSettingsId }) {
  const [features, setFeatures] = useState([]);
  const [platformSettingFeatureModel, setPlatformSettingFeatureModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    toastContext,
    getAccessToken,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    setFeatures([]);

    if (isOpseraAdministrator === true && isMongoDbId(platformSettingsId) === true) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [platformSettingsId, isOpseraAdministrator]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getPlatformSettingFeatures();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getPlatformSettingFeatures = async () => {
    const response = await platformSettingFeatureActions.getPlatformSettingFeatures(
      getAccessToken,
      cancelTokenSource,
      platformSettingsId,
    );
    const featuresList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(featuresList)) {
      setFeatures([...featuresList]);
    }
  };

  const handleRowSelectFunction = (rowData) => {
    const parsedModel = modelHelpers.parseObjectIntoModel(rowData?.original, platformSettingFeatureMetadata);
    setPlatformSettingFeatureModel({...parsedModel});
  };

  const closePanelFunction = async () => {
    setPlatformSettingFeatureModel(null);
    await loadData();
  };

  if (platformSettingFeatureModel != null) {
    return (
      <PlatformSettingFeatureEditorPanel
        closePanelFunction={closePanelFunction}
        platformSettingFeatureModel={platformSettingFeatureModel}
        setPlatformSettingFeatureModel={setPlatformSettingFeatureModel}
        platformSettingsId={platformSettingsId}
        loadData={loadData}
      />
    );
  }

  return (
    <PlatformSettingFeatureTable
      isLoading={isLoading}
      features={features}
      platformSettingsId={platformSettingsId}
      loadData={loadData}
      handleRowSelectFunction={handleRowSelectFunction}
    />
  );
}

PlatformSettingFeaturesPanel.propTypes = {
  platformSettingsId: PropTypes.string,
};
