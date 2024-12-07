import "./tiptap.module.css";
import { Box, Button, ButtonGroup } from "@mui/material";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Strike from "@tiptap/extension-strike";
import Italic from "@tiptap/extension-italic";
import Text from "@tiptap/extension-text";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faListAlt } from "@fortawesome/free-regular-svg-icons";

export default ({ text, setText }: { text: string; setText: Function }) => {
  const editor = useEditor({
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setText(editor?.getHTML());
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      BulletList,
      ListItem,
      Bold,
      Strike,
      Italic,
      Color,
      TextStyle,
      Placeholder.configure({
        placeholder: "Enter some text...",
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass:
          "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none is-editor-empty",
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: `${text}`,
  });

  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        border: "1px solid gray",
        borderRadius: "0.5rem",
        padding: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* <IconButton */}
        {/*   onClick={() => editor.chain().focus().toggleBulletList().run()} */}
        {/* > */}
        {/*   <FontAwesomeIcon icon={faListAlt} /> */}
        {/* </IconButton> */}
        <input
          style={{ width: "2rem", height: "2rem" }}
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target?.value).run()
          }
          value={editor.getAttributes("textStyle").color}
        />

        <ButtonGroup sx={{ color: "gray" }} variant="outlined">
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            sx={{ color: "gray", borderColor: "gray" }}
          >
            H1
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            sx={{ color: "gray", borderColor: "gray" }}
          >
            H2
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            sx={{ color: "gray", borderColor: "gray" }}
          >
            H3
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            sx={{ color: "gray", borderColor: "gray", fontWeight: 900 }}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            B
          </Button>
          <Button
            sx={{
              color: "gray",
              borderColor: "gray",
              textDecoration: "line-through",
            }}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            S
          </Button>
          <Button
            sx={{
              color: "gray",
              borderColor: "gray",
              fontStyle: "italic",
            }}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            I
          </Button>
        </ButtonGroup>
      </Box>
      <EditorContent
        style={{
          "*": {
            color: "blue",
          },
        }}
        editor={editor}
      />
    </Box>
  );
};
