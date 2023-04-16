import React from "react";
import pipelinesFaq from '@opsera/react-faq-markdown/src/markdown/faq/pipelines/pipelines.faq.md';
import {ReactMarkdownWrapper} from "@opsera/react-vanity-set";

export default function PipelinesFrequentlyAskedQuestions() {
  return (
      <ReactMarkdownWrapper
        markdownFile={pipelinesFaq}
        className={"m-4"}
      />
  );
}
