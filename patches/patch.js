document.addEventListener('DOMContentLoaded', (event) => {
    // Use a mutation observer to ensure the elements are hidden even if the DOM changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                hideSpecificElements();
                disableMarkdownEditing();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Function to hide specific elements
    function hideSpecificElements() {
        const selectors = [
            // options in cells
            '.jp-cell-toolbar.jp-cell-menu.jp-Toolbar.lm-Widget',
            // options above notebook main field
            '.jp-NotebookPanel-toolbar.jp-Toolbar.lm-Widget',
            // file browser search menue
            '.jp-FileBrowser-toolbar.jp-SidePanel-toolbar.jp-Toolbar.lm-Widget',
            // jupyter lite icon / logo
            '.f1xpzunt.lm-Widget',
            // option for Table of Contents
            '#tab-key-1-3',
            // option for simple mode
            '#jp-single-document-mode',
            // kernel selection menue
            'div.jp-StatusBar-Item.jp-mod-highlighted.lm-Widget:nth-of-type(5)',
            // "click to add new cell"
            '.jp-Notebook-footer.lm-Widget',
            // Property ispector
            '.lm-BoxPanel-child.jp-mod-right.jp-SideBar.lm-TabBar.lm-Widget > .lm-TabBar-content > .lm-TabBar-tab'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.display = 'none';
            });
        });
    }

    // Function to disable editing on double-click for Markdown cells
    function disableMarkdownEditing() {
        // Query all Markdown cells
        const markdownCells = document.querySelectorAll('.jp-Notebook-cell.jp-MarkdownCell.jp-Cell');
        markdownCells.forEach(cell => {
            // Remove any existing double-click event listeners
            cell.removeEventListener('dblclick', preventMarkdownEdit);
            // Add a new event listener to prevent editing on double-click
            cell.addEventListener('dblclick', preventMarkdownEdit);
        });
    }

    // Function to prevent the editing of Markdown cells
    function preventMarkdownEdit(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Initially hide specific elements, disable editing on double-click for Markdown cells, and override Shift + Enter behavior when the script runs
    hideSpecificElements();
    disableMarkdownEditing();
});