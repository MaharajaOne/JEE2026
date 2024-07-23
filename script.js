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

    function sortTable(columnIndex) {
        const table = document.getElementById('issueTable');
        const tbody = table.getElementsByTagName('tbody')[0];
        const rows = Array.from(tbody.getElementsByTagName('tr'));

        rows.sort((a, b) => {
            const aValue = a.getElementsByTagName('td')[columnIndex].innerText;
            const bValue = b.getElementsByTagName('td')[columnIndex].innerText;

            if (columnIndex === 0) {
                // Numeric sorting for the first column
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
    });