import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import Toolbar from "./Toolbar";

import "./editor.css";

export default function Editor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                Link: {
                    openOnClick: false
                }
            }),

            Placeholder.configure({
                placeholder: "Start writing..."
            }),

            Highlight,

            Image,

            TextAlign.configure({
                types: ["heading", "paragraph"]
            }),
        ],

        content: value,

        editorProps: {
            attributes: {
                class:
                    "prose dark:prose-invert max-w-none min-h-[500px] focus:outline-none"
            }
        },

        onUpdate({ editor }) {
            onChange(editor.getHTML());
        }
    });

    return (
        <div className="rounded-3xl border border-black/10 dark:border-white/10">
            <Toolbar editor={editor} />

            <EditorContent editor={editor} className="p-6" />
        </div>
    );
}