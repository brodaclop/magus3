
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownText: React.FC<{ children: string }> = ({ children }) => <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {children}
</ReactMarkdown>;