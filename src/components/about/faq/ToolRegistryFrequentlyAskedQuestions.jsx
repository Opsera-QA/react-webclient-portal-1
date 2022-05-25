import React from "react";
import toolregistryFaq from 'markdown/faq/toolregistry/toolregistry.faq.md';
import ReactMarkdownWrapper from "components/common/markdown/ReactMarkdownWrapper";

const ToolRegistryFrequentlyAskedQuestions = () => {
  return (
      <ReactMarkdownWrapper
        markdownFile={toolregistryFaq}
        className={"m-4"}
      />
  );
};


export default ToolRegistryFrequentlyAskedQuestions;