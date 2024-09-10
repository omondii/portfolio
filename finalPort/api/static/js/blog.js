document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Open modal when "Read More" is clicked
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = this.getAttribute('data-post-id');
            fetch(`/blog/${postId}`)
                .then(response => response.json())
                .then(data => {
                    modalTitle.textContent = data.title;
                    modalContent.textContent = data.content;
                    modal.style.display = 'block';
                })
                .catch(error => console.error('Error:', error));
        });
    });

    // Close modal when close button is clicked
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});