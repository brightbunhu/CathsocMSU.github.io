document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and has permission to post
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !['executive', 'father', 'chairman'].includes(currentUser.role)) {
        window.location.href = 'login.html';
    }

    const eventForm = document.getElementById('eventForm');
    const announcementForm = document.getElementById('announcementForm');
    const isFreeEvent = document.getElementById('isFreeEvent');
    const eventFee = document.getElementById('eventFee');

    // Handle free event checkbox
    isFreeEvent.addEventListener('change', function() {
        eventFee.disabled = this.checked;
        if (this.checked) {
            eventFee.value = '0';
        }
    });

    // Handle event form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const eventData = {
            title: document.getElementById('eventTitle').value,
            type: document.getElementById('eventType').value,
            date: document.getElementById('eventDate').value,
            duration: document.getElementById('eventDuration').value,
            venue: document.getElementById('eventVenue').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value,
            fee: isFreeEvent.checked ? 0 : parseFloat(eventFee.value),
            isFree: isFreeEvent.checked,
            status: 'pending',
            author: currentUser.fullName,
            authorId: currentUser.studentId,
            createdAt: new Date().toISOString()
        };

        // Handle image upload if provided
        const imageFile = document.getElementById('eventImage').files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                eventData.image = e.target.result;
                saveEvent(eventData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            saveEvent(eventData);
        }
    });

    // Handle announcement form submission
    announcementForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const announcementData = {
            title: document.getElementById('announcementTitle').value,
            content: document.getElementById('announcementContent').value,
            priority: document.getElementById('announcementPriority').value,
            status: 'pending',
            author: currentUser.fullName,
            authorId: currentUser.studentId,
            date: new Date().toISOString()
        };

        saveAnnouncement(announcementData);
    });
});

// Save event to localStorage
function saveEvent(eventData) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(eventData);
    localStorage.setItem('events', JSON.stringify(events));
    
    showSuccessMessage('Event submitted successfully and awaiting approval.');
    document.getElementById('eventForm').reset();
}

// Save announcement to localStorage
function saveAnnouncement(announcementData) {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    announcements.push(announcementData);
    localStorage.setItem('announcements', JSON.stringify(announcements));
    
    showSuccessMessage('Announcement submitted successfully and awaiting approval.');
    document.getElementById('announcementForm').reset();
}

// Show success modal
function showSuccessMessage(message) {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    messageElement.textContent = message;
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Show selected tab
function showTab(tabName) {
    // Hide all sections
    document.querySelectorAll('.post-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section and activate tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// Handle escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}); 