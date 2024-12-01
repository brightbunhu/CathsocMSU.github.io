// Navigation and access control
const navigationRules = {
    public: [
        { path: 'index.html', label: 'Home' },
        { path: 'prayers.html', label: 'Prayers' },
        { path: 'login.html', label: 'Login' }
    ],
    member: [
        { path: 'index.html', label: 'Home' },
        { path: 'prayers.html', label: 'Prayers' },
        { path: 'dashboard.html', label: 'Dashboard' },
        { path: 'member-payments.html', label: 'My Payments' },
        { path: 'feedback.html', label: 'Feedback' }
    ],
    executive: [
        { path: 'index.html', label: 'Home' },
        { path: 'prayers.html', label: 'Prayers' },
        { path: 'dashboard.html', label: 'Dashboard' },
        { path: 'post.html', label: 'Post Updates' },
        { path: 'member-payments.html', label: 'My Payments' },
        { path: 'metrics.html', label: 'Metrics' }
    ],
    treasurer: [
        { path: 'index.html', label: 'Home' },
        { path: 'prayers.html', label: 'Prayers' },
        { path: 'dashboard.html', label: 'Dashboard' },
        { path: 'treasurer.html', label: 'Manage Payments' },
        { path: 'metrics.html', label: 'Financial Metrics' }
    ],
    father: [
        { path: 'index.html', label: 'Home' },
        { path: 'prayers.html', label: 'Prayers' },
        { path: 'dashboard.html', label: 'Dashboard' },
        { path: 'father.html', label: 'Approvals' },
        { path: 'father/manage-executives.html', label: 'Manage Executives' },
        { path: 'metrics.html', label: 'Metrics' }
    ]
};

function loadNavigation() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const role = currentUser ? currentUser.role : 'public';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    const navLinks = navigationRules[role];
    const navElement = document.querySelector('nav ul');
    
    if (navElement) {
        navElement.innerHTML = navLinks.map(link => `
            <li>
                <a href="${link.path}" ${currentPath === link.path ? 'class="active"' : ''}>
                    ${link.label}
                </a>
            </li>
        `).join('');
        
        // Add logout button for logged-in users
        if (role !== 'public') {
            navElement.innerHTML += `
                <li>
                    <a href="#" onclick="logout()" class="logout-btn">Logout</a>
                </li>
            `;
        }
    }
}

function checkAccess(allowedRoles) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', loadNavigation); 