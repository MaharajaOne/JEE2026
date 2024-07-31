function showContent(contentId) {
    const contents = document.querySelectorAll('.content');

    // Remove the 'active' class from all content sections
    contents.forEach(content => {
        content.classList.remove('active');
    });

    const selectedContent = document.getElementById(contentId);
    
    if (selectedContent) {
        if (contentId === 'TA') {
            // Fetch and load the content of testanalysis.html if TA is selected
            fetch('testanalysis.html')
                .then(response => response.text())
                .then(data => {
                    selectedContent.innerHTML = data;
                    selectedContent.classList.add('active');
                    // Save the selected content ID to local storage
                    localStorage.setItem('selectedContent', contentId);
                })
                .catch(error => console.error('Error loading content:', error));
        } else {
            // Just show the selected content if not 'TA'
            selectedContent.classList.add('active');
            // Save the selected content ID to local storage
            localStorage.setItem('selectedContent', contentId);
        }
    } else {
        console.error("Content with ID " + contentId + " not found.");
    }
}


let currentSortColumn = -1;
let isAscending = true;

function sortTable(tableId, columnIndex) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    rows.sort((a, b) => {
        const aValue = a.getElementsByTagName('td')[columnIndex].innerText;
        const bValue = b.getElementsByTagName('td')[columnIndex].innerText;

        if (tableId === 'Notice' && columnIndex === 0) {
            // Date sorting for the first column in "Notice" table
            return isAscending ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
        } else if (!isNaN(aValue) && !isNaN(bValue)) {
            // Numeric sorting for numeric columns
            return isAscending ? aValue - bValue : bValue - aValue;
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

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('#issueTable tbody a');

    links.forEach(link => {
        const targetAttribute = link.getAttribute('data-target');
        if (targetAttribute) {
            link.setAttribute('target', targetAttribute);
        }
    });

    // Add event listeners for sortable columns
    const noticeTableHeaders = document.querySelectorAll('#Notice th');
    noticeTableHeaders.forEach((header, index) => {
        header.addEventListener('click', () => sortTable('Notice', index));
    });

    const mnTableHeaders = document.querySelectorAll('#MN th');
    mnTableHeaders.forEach((header, index) => {
        header.addEventListener('click', () => sortTable('MN', index));
    });
    
    const pnTableHeaders = document.querySelectorAll('#PN th');
    pnTableHeaders.forEach((header, index) => {
        header.addEventListener('click', () => sortTable('PN', index));
    });
});
