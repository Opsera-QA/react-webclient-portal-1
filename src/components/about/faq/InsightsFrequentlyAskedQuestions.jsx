import React from "react";
import insightsFaq from '@opsera/react-faq-markdown/src/markdown/faq/insights/insights.faq.md';
import {ReactMarkdownWrapper} from "@opsera/react-vanity-set/dist/makeup-and-vanity-set.module.modern";

const InsightsFrequentlyAskedQuestions = () => {
  return (
      <ReactMarkdownWrapper
        markdownFile={insightsFaq}
        className={"m-4"}
      />
  );
};


export default InsightsFrequentlyAskedQuestions;