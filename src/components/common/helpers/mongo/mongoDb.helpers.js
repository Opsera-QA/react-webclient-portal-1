import regexDefinitions from "utils/regexDefinitions";
import {matchesRegex} from "utils/helpers";

export function isMongoDbId (potentialId) {
  if (potentialId == null || typeof potentialId !== "string" || potentialId === ""){
    return false;
  }

  const mongoIdRegex = regexDefinitions?.mongoId?.regex;
  return matchesRegex(mongoIdRegex, potentialId);
}