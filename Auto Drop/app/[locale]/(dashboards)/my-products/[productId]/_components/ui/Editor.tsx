import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface EditorProps {
  value?: string | undefined;
  onChange?: (
    value: string | undefined,
    delta: any,
    source: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => void;
}

const Editor = React.forwardRef<ReactQuill,EditorProps>(({
  onChange,
  value,
},ref) =>{
  return (
    <div className="rounded-xl overflow-hidden border-[#d2d2d2] border-2">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="bg-[#edf5f9] dark:!text-black !border-none"
        // ref={ref}
      />
    </div>
  );
})
Editor.displayName = 'Editor';
export default Editor;