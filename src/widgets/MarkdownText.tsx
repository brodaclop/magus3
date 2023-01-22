
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { APP_BASE } from "../App";

export const MarkdownText: React.FC<{ children: string }> = ({ children }) => <ReactMarkdown className="markdown"
    transformLinkUri={(href, children, title) => {
        if (href.startsWith('entity:')) {
            return `${APP_BASE}/entity/${href.slice('entity:'.length)}`
        }
        return href;
    }}
    remarkPlugins={[remarkGfm]}>
    {children}
</ReactMarkdown>;