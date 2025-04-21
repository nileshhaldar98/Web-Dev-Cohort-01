document.addEventListener("DOMContentLoaded", () => {
    const editorText = document.getElementById("editor-textarea");
    const previewText = document.getElementById("preview");
    const clearButton = document.getElementById("clear-button");

    clearButton.addEventListener("click", () => {
        editorText.value = "";
        previewText.innerHTML = "";
    });

    const parseMarkdown = (text) => {
        let html = text
        .replace(/^#\s*(.*)$/gm, "<h1>$1</h1>") // H1
        .replace(/^##\s*(.*)$/gm, "<h2>$1</h2>") // H2
        .replace(/^###\s*(.*)$/gm, "<h3>$1</h3>") // H3
        .replace(/^####\s*(.*)$/gm, "<h4>$1</h4>") // H4
        .replace(/^#####\s*(.*)$/gm, "<h5>$1</h5>") // H5
        .replace(/^######\s*(.*)$/gm, "<h6>$1</h6>") // H6
        .replace(/\*\*(.*?)\*\*/gm, "<b>$1</b>") // Bold (**text**)
        .replace(/\*(.*?)\*/gm, "<i>$1</i>") // Italic (*text*)
        .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2" target="_blank">$1</a>') // Links [text](url)
        .replace(/^\-\s(.*)$/gm, "<li>$1</li>") // List (- item)
        .replace(/(?:\r\n|\r|\n)/g, "<br>"); // Newline to <br>

        previewText.innerHTML = html;
    };

    editorText.addEventListener("input", () => parseMarkdown(editorText.value));
});