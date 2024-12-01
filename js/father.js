document.addEventListener('DOMContentLoaded', function() {
    // Check access first
    if (!checkAccess(['father'])) return;
    
    // Rest of father initialization code
    loadPendingAnnouncements();
    loadPendingEvents();
    // ...
}); 