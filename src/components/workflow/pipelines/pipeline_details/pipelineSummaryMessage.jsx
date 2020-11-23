import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";


function PipelineSummaryMessages({ type, lastRun, tags, runCount, getUserRecord }) {
  const [containerUrl, setContainerUrl] = useState("");
  const [prefixMessage, setPrefixMessage] = useState("");

  useEffect(() => {
    const { status, run_count } = lastRun;
    const languageTypes = ["java", "python", "java-ebs"]; //matches pipeline:tag values
    let tagLanguage = _getSupportedLanguageType(tags, languageTypes);

    if (tags.some(e => e.type === "pipeline" && e.value === "free-trial")) {
      if (type === "free-trial-container-url-msg" &&
        status.toLowerCase() === "success" &&
        runCount === run_count) {

        loadDomain(tagLanguage).catch((e) => {
          console.error(e);
        });
      }
    }
  }, [JSON.stringify(lastRun), runCount]);

  const loadDomain = async (tagLanguageVal) => {
    const userRecord = await getUserRecord();
    const domain = userRecord.domain;
    const appSubDomain = tagLanguageVal;

    if (!userRecord.domain || !appSubDomain) {
      return;
    }

    let url = `${appSubDomain}.${domain}.opsera.io`;
    setContainerUrl(url);
    setPrefixMessage("A new package is available and can be accessed via your browser at:");
  };

  if (!lastRun || !tags || !getUserRecord) {
    return null;
  }

  if (containerUrl && prefixMessage) {
    return (
      <span className="ml-1">{prefixMessage}
        <span style={{ color: "blue" }} className="ml-1">{containerUrl}</span>
      </span>
    );
  }

  return null;
}

const _getSupportedLanguageType = (tags, languageTypes) => {
  let foundLanguageTag = null;
  languageTypes.map(lang => {
    if (tags.some(e => e.type === "pipeline" && e.value === lang)) {
      foundLanguageTag = lang;
    }
  })
  return foundLanguageTag;
}
/*
const _checkTagLanguageType = (tags,expectedLang) => {
  if (tags.some(e => e.type === "pipeline" && e.value === expectedLang)) {
    return true;
  }
  return false;
}*/


PipelineSummaryMessages.propTypes = {
  type: PropTypes.string,
  lastRun: PropTypes.object,
  tags: PropTypes.array,
  runCount: PropTypes.number,
  getUserRecord: PropTypes.func,
};

export default PipelineSummaryMessages;