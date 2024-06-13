// Script that hides elements in jupyter notebook to prevent user from breaking stuff
// This script is "injected" into ./dist/lab/index.html -> see pipeline
// Author: Chat-GPT

document.addEventListener('DOMContentLoaded', (event) => {
    // Use a mutation observer to ensure the elements are hidden even if the DOM changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                hideSpecificElements();
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

    // Initially hide specific elements when the script runs
    hideSpecificElements();
});