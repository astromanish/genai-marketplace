import React from "react";
import { Editor } from "react-draft-wysiwyg";

function DescriptionEditor({ editorState, onEditorStateChange }) {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbarClassName="toolbar-class"
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
    />
  );
}

export default DescriptionEditor;
