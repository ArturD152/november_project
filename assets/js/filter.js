document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.dropdown-content .filter-btn');
    const blocks = document.querySelectorAll('.section__block2');

    function filterBlocks(category) {
        blocks.forEach(block => {
            if (category === 'all' || block.getAttribute('data-category') === category) {
                block.classList.add('active');
            } else {
                block.classList.remove('active');
            }
        });

        // Update active class for buttons
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBlocks(this.getAttribute('data-filter'));
        });
    });

    filterBlocks('all');
});