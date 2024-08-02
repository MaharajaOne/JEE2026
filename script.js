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
    const links = document.querySelectorAll('#issueTable tbody a');
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

let currentSortColumn = {};
let isAscending = {};

function sortTable(tableId, columnIndex) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    const isAsc = columnIndex in isAscending ? !isAscending[columnIndex] : true;
    isAscending[columnIndex] = isAsc;

    rows.sort((a, b) => {
        const aValue = a.getElementsByTagName('td')[columnIndex].innerText.trim();
        const bValue = b.getElementsByTagName('td')[columnIndex].innerText.trim();

        if (tableId === 'Notice' && columnIndex === 0) {
            // Date sorting for the first column in "Notice" table
            return isAsc ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
        } else if (!isNaN(aValue) && !isNaN(bValue)) {
            // Numeric sorting for numeric columns
            return isAsc ? aValue - bValue : bValue - aValue;
        } else {
            // Alphabetic sorting for other columns
            return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    rows.forEach(row => {
        tbody.appendChild(row);
    });

    currentSortColumn[tableId] = columnIndex;
}
function showContent(id) {
    // Hide all content sections
    var contents = document.querySelectorAll('.content');
    contents.forEach(function(content) {
        content.style.display = 'none';
    });

    // Show the selected content
    document.getElementById(id).style.display = 'block';

    // Load external content for Test Analysis
    if (id === 'TA') {
        fetch('testanalysis.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('TA').innerHTML = data;
            })
            .catch(error => console.error('Error loading the Test Analysis content:', error));
    }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    table = document.querySelector('.content:not([style*="display: none"]) table');
    switching = true;
    dir = "asc";
    
    while (switching) {
        switching = false;
        rows = table.rows;
        
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
