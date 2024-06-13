document.addEventListener('DOMContentLoaded', (event) => {
    // Use a mutation observer to ensure the elements are hidden even if the DOM changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                hideSpecificElements();
                disableMarkdownEditing();
                overrideShiftEnterBehavior();
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
            // hide options in cells
            '.jp-cell-toolbar.jp-cell-menu.jp-Toolbar.lm-Widget',
            // hide options above notebook main field
            '.jp-NotebookPanel-toolbar.jp-Toolbar.lm-Widget',
            // hide file browser search menue
            '.jp-FileBrowser-toolbar.jp-SidePanel-toolbar.jp-Toolbar.lm-Widget',
            // hide jupyter lite icon
            '.f1xpzunt.lm-Widget',
            // hide option for Table of Contents
            '#tab-key-1-3',
            // hide option for simple mode
            '#jp-single-document-mode'
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

    // Function to override Shift + Enter behavior
    function overrideShiftEnterBehavior() {
        // Remove the existing Shift + Enter shortcut
        Jupyter.notebook.keyboard_manager.command_shortcuts.remove_shortcut('shift-enter');
        Jupyter.notebook.keyboard_manager.edit_shortcuts.remove_shortcut('shift-enter');
        
        // Add a new Shift + Enter shortcut
        Jupyter.notebook.keyboard_manager.command_shortcuts.add_shortcut('shift-enter', {
            handler: function(event) {
                Jupyter.notebook.execute_cell();
                return false;
            }
        });

        Jupyter.notebook.keyboard_manager.edit_shortcuts.add_shortcut('shift-enter', {
            handler: function(event) {
                Jupyter.notebook.execute_cell();
                return false;
            }
        });
    }

    // Initially hide specific elements, disable editing on double-click for Markdown cells, and override Shift + Enter behavior when the script runs
    hideSpecificElements();
    disableMarkdownEditing();
    overrideShiftEnterBehavior();
});