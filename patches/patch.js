// Script that hides elements in jupyter notebook to prevent user from breaking stuff
// This script is "injected" into ./dist/lab/index.html -> see pipeline
// Author: Chat-GPT

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
        // Query all elements with the specified class and hide them
        const cellToolbars = document.querySelectorAll('.jp-cell-toolbar.jp-cell-menu.jp-Toolbar.lm-Widget');
        cellToolbars.forEach(element => {
            element.style.display = 'none';
        });

        // Query all elements matching the second selector and hide them
        const toolbarButtons = document.querySelectorAll('.jp-NotebookPanel-toolbar.jp-Toolbar.lm-Widget > div.jp-Toolbar-item.jp-CommandToolbarButton.lm-Widget > .jp-ToolbarButtonComponent');
        toolbarButtons.forEach(element => {
            element.style.display = 'none';
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

    // Initially hide specific elements and disable editing on double-click for Markdown cells when the script runs
    hideSpecificElements();
    disableMarkdownEditing();
});