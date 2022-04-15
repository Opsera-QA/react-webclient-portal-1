import React from "react";
import pipelinesFaq from 'markdown/faq/pipelines/pipelines.faq.md';
import ReactMarkdownWrapper from "components/common/markdown/ReactMarkdownWrapper";

const PipelinesFrequentlyAskedQuestions = () => {
  return (
      <ReactMarkdownWrapper
        markdownFile={pipelinesFaq}
        className={"m-4"}
      />
  );
};


export default PipelinesFrequentlyAskedQuestions;