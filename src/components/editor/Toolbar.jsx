import { useState } from "react";
import { Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, Quote, Code2, Undo2, Redo2, Link2, Unlink, Check, X, } from "lucide-react";
import { Tooltip } from "react-tooltip";

export default function Toolbar({ editor }) {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");

    if (!editor) return null;

    const openLinkEditor = () => {
        setLinkUrl(editor.getAttributes("link").href || "");
        setShowLinkInput(true);
    };

    const applyLink = () => {
        if (!linkUrl.trim()) {
            editor.chain().focus().unsetLink().run();
        } else {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: linkUrl })
                .run();
        }

        setShowLinkInput(false);
        setLinkUrl("");
    };

    const removeLink = () => {
        editor.chain().focus().unsetLink().run();
        setShowLinkInput(false);
        setLinkUrl("");
    };

    const Button = ({ title, onClick, active, children }) => (
        <button
            type="button"
            onClick={onClick}
            data-tooltip-id="editor-tooltip"
            data-tooltip-content={title}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${active
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                }`}
        >
            {children}
        </button>
    );

    return (
        <>
            <div className="border-b border-black/10 dark:border-white/10">
                <div className="flex flex-wrap gap-2 p-3">
                    <Button
                        title="Bold"
                        active={editor.isActive("bold")}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <Bold size={18} />
                    </Button>

                    <Button
                        title="Italic"
                        active={editor.isActive("italic")}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <Italic size={18} />
                    </Button>

                    <Button
                        title="Underline"
                        active={editor.isActive("underline")}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <Underline size={18} />
                    </Button>

                    <Button
                        title="Heading 1"
                        active={editor.isActive("heading", { level: 1 })}
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 1 }).run()
                        }
                    >
                        <Heading1 size={18} />
                    </Button>

                    <Button
                        title="Heading 2"
                        active={editor.isActive("heading", { level: 2 })}
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 2 }).run()
                        }
                    >
                        <Heading2 size={18} />
                    </Button>

                    <Button
                        title="Bullet List"
                        active={editor.isActive("bulletList")}
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        <List size={18} />
                    </Button>

                    <Button
                        title="Ordered List"
                        active={editor.isActive("orderedList")}
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        <ListOrdered size={18} />
                    </Button>

                    <Button
                        title="Quote"
                        active={editor.isActive("blockquote")}
                        onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                        }
                    >
                        <Quote size={18} />
                    </Button>

                    <Button
                        title="Insert Link"
                        active={editor.isActive("link")}
                        onClick={openLinkEditor}
                    >
                        <Link2 size={18} />
                    </Button>

                    <Button title="Remove Link" onClick={removeLink}>
                        <Unlink size={18} />
                    </Button>

                    <Button
                        title="Code Block"
                        active={editor.isActive("codeBlock")}
                        onClick={() =>
                            editor.chain().focus().toggleCodeBlock().run()
                        }
                    >
                        <Code2 size={18} />
                    </Button>

                    <Button
                        title="Undo"
                        onClick={() => editor.chain().focus().undo().run()}
                    >
                        <Undo2 size={18} />
                    </Button>

                    <Button
                        title="Redo"
                        onClick={() => editor.chain().focus().redo().run()}
                    >
                        <Redo2 size={18} />
                    </Button>
                </div>

                {showLinkInput && (
                    <div className="flex items-center gap-2 border-t border-black/10 p-3 dark:border-white/10">
                        <input
                            autoFocus
                            type="url"
                            placeholder="https://example.com"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") applyLink();
                                if (e.key === "Escape") setShowLinkInput(false);
                            }}
                            className="flex-1 rounded-xl border border-black/10 bg-transparent px-4 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:focus:border-white"
                        />

                        <button
                            type="button"
                            onClick={applyLink}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                        >
                            <Check size={18} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowLinkInput(false)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
            </div>

            <Tooltip
                id="editor-tooltip"
                place="top"
                delayShow={200}
                className="rounded-xl! bg-black! px-3! py-2! text-xs! dark:bg-white! dark:text-black!"
            />
        </>
    );
}