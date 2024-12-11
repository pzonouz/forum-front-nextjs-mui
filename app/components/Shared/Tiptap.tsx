import { Box, Button, ButtonGroup } from "@mui/material";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Strike from "@tiptap/extension-strike";
import Italic from "@tiptap/extension-italic";
import Text from "@tiptap/extension-text";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useCallback } from "react";
import { symlink } from "fs";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faListAlt } from "@fortawesome/free-regular-svg-icons";

export default ({ text, setText }: { text: string; setText: Function }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: "outline: none;boder:none;box-shadow:none",
      },
    },
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
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
    ],

    content: `${text}`,
  });

  if (!editor) {
    return null;
  }
  const addLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        border: "1px solid gray",
        borderRadius: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          paddingBottom: "1rem",
          borderBottom: "1px solid gray",
          padding: "1rem",
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
          value={editor.getAttributes("textStyle").color || "#fff"}
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
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            sx={{ color: "gray", borderColor: "gray" }}
          >
            P
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            sx={{ color: "gray", borderColor: "gray", fontWeight: 900 }}
            onClick={() => editor.chain().focus().toggleBold().run()}
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
          <Button
            sx={{
              color: "gray",
              borderColor: "gray",
              fontStyle: "italic",
            }}
            onClick={() => addLink()}
          >
            L
          </Button>
        </ButtonGroup>
      </Box>
      <EditorContent editor={editor} />
    </Box>
  );
};
