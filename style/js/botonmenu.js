document.addEventListener('DOMContentLoaded', function () {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdown = document.querySelector('.dropdown');

    dropdownBtn.addEventListener('click', function () {
        dropdownContent.style.display =
            dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener(
        'click',
        function (e) {
            if (!dropdown.contains(e.target)) {
                dropdownContent.style.display = 'none';
            }
        },
        { passive: true } // Optimización para scroll-blocking events
    );
});



