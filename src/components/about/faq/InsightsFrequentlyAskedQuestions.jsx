import React from "react";
import insightsFaq from 'markdown/faq/insights/insights.faq.md';
import ReactMarkdownWrapper from "components/common/markdown/ReactMarkdownWrapper";

const InsightsFrequentlyAskedQuestions = () => {
  return (
      <ReactMarkdownWrapper
        markdownFile={insightsFaq}
        className={"m-4"}
      />
  );
};


export default InsightsFrequentlyAskedQuestions;