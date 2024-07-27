// Function to show the selected content
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

// Event listener for DOMContentLoaded to show the saved content
document.addEventListener('DOMContentLoaded', function () {
    const selectedContentId = localStorage.getItem('selectedContent');
    if (selectedContentId) {
        showContent(selectedContentId);
    } else {
        showContent('Notice'); // Default to Notice if no selection saved
    }
});

let currentSortColumn = -1;
let isAscending = true;

// Function to sort the Notice table
function sortTable(columnIndex, tableId) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    rows.sort((a, b) => {
        const aValue = a.getElementsByTagName('td')[columnIndex].innerText;
        const bValue = b.getElementsByTagName('td')[columnIndex].innerText;

        if (columnIndex === 0) {
            // Date sorting for the first column
            const dateA = new Date(aValue);
            const dateB = new Date(bValue);
            return isAscending ? dateA - dateB : dateB - dateA;
        } else {
            // Alphabetic sorting for other columns
            return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    rows.forEach(row => {
        tbody.appendChild(row);
    });

    // Toggle sort order
    if (columnIndex === currentSortColumn) {
        isAscending = !isAscending;
    } else {
        isAscending = true;
    }

    currentSortColumn = columnIndex;
}

// Function to sort the MN table
function sortMNTable(columnIndex) {
    sortTable(columnIndex, 'MN');
}

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('#issueTable tbody a');

    links.forEach(link => {
        const targetAttribute = link.getAttribute('data-target');
        if (targetAttribute) {
            link.setAttribute('target', targetAttribute);
        }
    });
});
