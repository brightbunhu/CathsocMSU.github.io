// Add this function at the top of login.js
function validateCredentials(studentId, password) {
    console.log('Attempting login with:', { studentId, password });
    
    const allUsers = [
        ACCOUNTS_DATA.chaplain,
        ...ACCOUNTS_DATA.executives,
        ...ACCOUNTS_DATA.members
    ];
    
    console.log('Available users:', allUsers);
    
    const user = allUsers.find(u => {
        const idMatch = u.studentId.toLowerCase() === studentId.toLowerCase();
        const passMatch = u.password === password;
        console.log('Checking user:', u.studentId, { idMatch, passMatch });
        return idMatch && passMatch;
    });
    
    return user;
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const studentId = document.getElementById('studentId').value;
        const password = document.getElementById('password').value;
        
        const user = validateCredentials(studentId, password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect based on role
            switch(user.role) {
                case 'father':
                    window.location.href = 'father.html';
                    break;
                case 'treasurer':
                    window.location.href = 'treasurer.html';
                    break;
                case 'chairman':
                case 'secretary':
                case 'vice_chairman':
                    window.location.href = 'dashboard.html';
                    break;
                default:
                    window.location.href = 'dashboard.html';
            }
        } else {
            // Show error message
            alert('Invalid credentials. Please try again.');
        }
    });
}); 