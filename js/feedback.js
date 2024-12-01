document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const thankyouMessage = document.getElementById('thankyouMessage');
    const anonymousCheckbox = document.getElementById('anonymous');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: anonymousCheckbox.checked ? 'Anonymous' : document.getElementById('name').value || 'Anonymous',
            email: anonymousCheckbox.checked ? '' : document.getElementById('email').value,
            feedbackType: document.getElementById('feedbackType').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        // Store feedback in localStorage
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.push(formData);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        
        // Show thank you message
        thankyouMessage.style.display = 'flex';
        
        // Reset form
        feedbackForm.reset();
    });
    
    // Handle anonymous checkbox
    anonymousCheckbox.addEventListener('change', function() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        if (this.checked) {
            nameInput.value = '';
            emailInput.value = '';
            nameInput.disabled = true;
            emailInput.disabled = true;
        } else {
            nameInput.disabled = false;
            emailInput.disabled = false;
        }
    });
});

// Close thank you message
function closeThankyou() {
    document.getElementById('thankyouMessage').style.display = 'none';
}

// Handle escape key to close thank you message
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeThankyou();
    }
}); 