function showContent(contentId) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.classList.add('active');
        localStorage.setItem('selectedContent', contentId);
    } else {
        console.error("Content with ID " + contentId + " not found.");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const selectedContentId = localStorage.getItem('selectedContent');
    if (!selectedContentId) {
        console.error("No selected content ID found in local storage.");
    } else {
        showContent(selectedContentId);
    }
});

let currentSortColumn = -1;
let isAscending = true;

function sortTable(columnIndex, tableId) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    rows.sort((a, b) => {
        let aValue = a.getElementsByTagName('td')[columnIndex].innerText;
        let bValue = b.getElementsByTagName('td')[columnIndex].innerText;

        if (columnIndex === 0 || columnIndex === 2) {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
            return isAscending ? aValue - bValue : bValue - aValue;
        } else {
            return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    rows.forEach(row => {
        tbody.appendChild(row);
    });

    if (columnIndex === currentSortColumn) {
        isAscending = !isAscending;
    } else {
        isAscending = true;
    }

    currentSortColumn = columnIndex;
}
