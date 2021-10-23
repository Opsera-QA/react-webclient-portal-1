import regexDefinitions from "utils/regexDefinitions";
import {matchesRegex} from "utils/helpers";

export function isMongoDbId (potentialId) {
  if (typeof potentialId !== "string" || potentialId === ""){
    return false;
  }

  const regexDefinition = regexDefinitions?.mongoId?.regex;
  const regex = regexDefinition?.regex;

  return matchesRegex(regex, potentialId);
}