import { visit } from 'unist-util-visit';

export default function remarkEmbeds() {
  return (tree) => {
    // 1. Handle plain text URLs or raw iframes that might be wrapped in text nodes
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined) return;
      const text = node.value.trim();
      
      // Auto-embed YouTube URLs
      const ytMatch = text.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?\s]+)$/);
      if (ytMatch) {
        const videoId = ytMatch[1];
        const iframe = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 20px; border-radius: 8px;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
        parent.children[index] = { type: 'html', value: iframe };
        return;
      }
      
      // Restore pasted iframes (Pinterest, YouTube, etc.) that Keystatic converted to text
      // Keystatic escapes < as &lt; in text sometimes, but unist text node might just have literal <
      if (text.startsWith('<iframe') && text.includes('</iframe>')) {
        parent.children[index] = { type: 'html', value: text };
        return;
      }
      
      // Also restore blockquotes if they pasted raw HTML (e.g. Instagram)
      if (text.startsWith('<blockquote') && text.includes('instagram')) {
        parent.children[index] = { type: 'html', value: text + '\n<script async src="//www.instagram.com/embed.js"></script>' };
        return;
      }
    });
    
    // 2. Handle links (if Keystatic made the YouTube URL a clickable link instead of plain text)
    visit(tree, 'link', (node, index, parent) => {
      if (!parent || index === undefined) return;
      const url = node.url;
      const ytMatch = url.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?\s]+)$/);
      
      // Only embed if the link text is the URL itself
      if (ytMatch && node.children.length === 1 && node.children[0].value === url) {
        const videoId = ytMatch[1];
        const iframe = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 20px; border-radius: 8px;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
        parent.children[index] = { type: 'html', value: iframe };
      }
    });
  };
}
