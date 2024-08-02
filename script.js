document.addEventListener('DOMContentLoaded', function () {
    // Load previously selected content from localStorage
    const selectedContentId = localStorage.getItem('selectedContent');
    if (selectedContentId) {
        showContent(selectedContentId);
    } else {
        console.error("No selected content ID found in local storage.");
    }

    // Add event listeners for sortable columns in all tables
    const tableIds = ['Notice', 'MN', 'PN'];

    tableIds.forEach(tableId => {
        const tableHeaders = document.querySelectorAll(`#${tableId} th`);
        tableHeaders.forEach((header, index) => {
            header.addEventListener('click', () => sortTable(tableId, index));
        });
    });

    // Handle external links in tables (if any)
    const links = document.querySelectorAll('.content a');
    links.forEach(link => {
        const targetAttribute = link.getAttribute('data-target');
        if (targetAttribute) {
            link.setAttribute('target', targetAttribute);
        }
    });
});

function showContent(contentId) {
    const contents = document.querySelectorAll('.content');

    contents.forEach(content => {
        content.classList.remove('active');
    });

    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.classList.add('active');
        // Save the selected content ID to local storage
        localStorage.setItem('selectedContent', contentId);
    } else {
        console.error("Content with ID " + contentId + " not found.");
    }
}

function sortTable(tableId, columnIndex) {
    const table = document.querySelector(`#${tableId}`);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const ascending = table.dataset.sortAscending === 'true';

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        return (ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA));
    });

    rows.forEach(row => tbody.appendChild(row));
    table.dataset.sortAscending = !ascending;
}
