import { useState } from "react";
import modelHelpers from "components/common/model/modelHelpers";
import {
  freeTrialUserExpirationManagementMetadata
} from "components/settings/trial/user_expiration/freeTrialUserExpirationManagement.metadata";

export default function useGetFreeTrialUserExpirationManagementModel() {
  const [freeTrialUserExpirationModel, setFreeTrialUserExpirationModel] = useState(modelHelpers.getNewModelForMetadata(freeTrialUserExpirationManagementMetadata));

  return ({
    freeTrialUserExpirationModel: freeTrialUserExpirationModel,
    setFreeTrialUserExpirationModel: setFreeTrialUserExpirationModel,
  });
}
