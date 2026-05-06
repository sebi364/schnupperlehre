// small patch that is supposed to clear the browser state,
// if the changes have been done more than 12h ago.
// Rational: we don't want student's to see other's solutions
// that are still cached.
// Author: Gemini (sry, I suck at JavaScript)

(async function() {
    const DB_NAME = 'JupyterLite Storage';
    const EXPIRY_TIME = 12 * 60 * 60 * 1000; // 12 Hours
    const now = Date.now();
    
    let lastReset = localStorage.getItem('last_jupyter_reset');

    // 1. If no timestamp exists, this is a fresh start. Set it and exit.
    if (!lastReset) {
        localStorage.setItem('last_jupyter_reset', now.toString());
        return;
    }

    // 2. Check if the current time is past the original 12h window
    if (now - parseInt(lastReset) > EXPIRY_TIME) {
        console.log("New day, new student. Clearing storage...");

        const deleteRequest = indexedDB.deleteDatabase(DB_NAME);

        deleteRequest.onsuccess = () => {
            localStorage.removeItem('last_jupyter_reset');
            localStorage.clear(); 
            window.location.reload();
        };

        deleteRequest.onblocked = () => {
            alert("Cleaning up previous session. Please close other tabs to continue.");
        };
        
        return; 
    }
})();


// Script that hides elements in jupyter notebook to prevent user from breaking stuff
// This script is "injected" into ./dist/lab/index.html (see pipeline)
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
        const selectors = [
            // file browser search menue
            '.jp-FileBrowser-toolbar.jp-SidePanel-toolbar.jp-Toolbar.lm-Widget',
            // jupyter lite icon / logo
            '.f1xpzunt.lm-Widget',
            // "click to add new cell"
            '.jp-Notebook-footer.lm-Widget',
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.display = 'none';
            });
        });
    }

    // Initially hide specific elements, disable editing on double-click for Markdown cells, and override Shift + Enter behavior when the script runs
    hideSpecificElements();
});