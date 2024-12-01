document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Load role-specific dashboard content
    switch(currentUser.role) {
        case 'member':
            loadMemberDashboard();
            break;
        case 'executive':
            loadExecutiveDashboard();
            break;
        case 'treasurer':
            loadTreasurerDashboard();
            break;
        case 'father':
            loadFatherDashboard();
            break;
    }
}); 