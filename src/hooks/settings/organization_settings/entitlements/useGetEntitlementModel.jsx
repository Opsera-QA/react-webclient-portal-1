import useComponentStateReference from "hooks/useComponentStateReference";
import EntitlementModel from "components/admin/organization_settings/details/entitlements/entitlement.model";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import modelHelpers from "components/common/model/modelHelpers";

export default function useGetEntitlementModel() {
  const { userData } = useComponentStateReference();

  const getEntitlementModel = (
    entitlement,
    isNew,
  ) => {
    const model = new EntitlementModel(
      entitlement,
      isNew,
    );

    model.userData = userData;

    return model;
  };

  const getChildEntitlementModel = (
    entitlement,
  ) => {
    const parsedEntitlementName = DataParsingHelper.parseNestedString(entitlement, "name");

    if (entitlementConstants.isEntitlementNameValid(parsedEntitlementName) !== true) {
      throw "Invalid Entitlement Name";
    }

    const parsedEntitlementParameters = DataParsingHelper.parseNestedObject(entitlement, "parameters", {});
    return modelHelpers.parseObjectIntoModel(parsedEntitlementParameters, entitlementConstants.getMetadataForEntitlementName(parsedEntitlementName));
  };

  const getNewEntitlementModelWithName = (
    entitlementName,
  ) => {
    const parsedEntitlementName = DataParsingHelper.parseString(entitlementName);

    if (entitlementConstants.isEntitlementNameValid(parsedEntitlementName) !== true) {
      throw "Invalid Entitlement Name";
    }

    const parameterMetadata = entitlementConstants.getMetadataForEntitlementName(entitlementName);
    const entitlement = {
      name: entitlementName,
      parameters: DataParsingHelper.parseObject(parameterMetadata?.newObjectFields, {}),
    };

    return new EntitlementModel(
      entitlement,
      true
    );
  };

  const getChildEntitlementModelWithName = (
    entitlementName,
  ) => {
    const parsedEntitlementName = DataParsingHelper.parseString(entitlementName);

    if (entitlementConstants.isEntitlementNameValid(parsedEntitlementName) !== true) {
      throw "Invalid Entitlement Name";
    }

    return modelHelpers.getNewModelForMetadata(entitlementConstants.getMetadataForEntitlementName(entitlementName));
  };


  return ({
    getEntitlementModel: getEntitlementModel,
    getChildEntitlementModel: getChildEntitlementModel,
    getNewEntitlementModelWithName: getNewEntitlementModelWithName,
    getChildEntitlementModelWithName: getChildEntitlementModelWithName,
  });
}
