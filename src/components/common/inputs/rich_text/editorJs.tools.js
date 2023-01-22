import Table from "@editorjs/table";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import NestedList from "@editorjs/nested-list";

export const EDITOR_JS_TOOLS = {
  table: Table,
  paragraph: Paragraph,
  code: Code,
  nestedList: {
    class: NestedList,
    inlineToolbar: true,
  },
  header: Header,
  quote: Quote,
  checklist: CheckList,
  inlineCode: InlineCode,
  Marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
    inlineToolbar: true,
  },
  delimiter: Delimiter,
};