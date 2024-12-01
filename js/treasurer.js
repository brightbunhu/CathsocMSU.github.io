document.addEventListener('DOMContentLoaded', function() {
    // Check access first
    if (!checkAccess(['treasurer'])) return;
    
    // Rest of treasurer initialization code
    initializeForms();
    loadStats();
    loadTransactions();
    populateStudentLists();
    populateEventList();
});

function initializeForms() {
    // Offertory Form
    document.getElementById('offertoryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const offertoryData = {
            date: document.getElementById('offertoryDate').value,
            amount: parseFloat(document.getElementById('offertoryAmount').value),
            type: 'offertory',
            status: 'completed'
        };
        savePayment(offertoryData);
        this.reset();
    });

    // Subscription Form
    document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const subscriptionData = {
            type: 'subscription',
            subType: document.getElementById('subscriptionType').value,
            studentId: document.getElementById('subscriptionStudent').value,
            amount: parseFloat(document.getElementById('subscriptionAmount').value),
            date: new Date().toISOString(),
            status: 'completed'
        };
        savePayment(subscriptionData);
        this.reset();
    });

    // Event Payment Form
    document.getElementById('eventPaymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const eventPaymentData = {
            type: 'event',
            eventId: document.getElementById('eventSelect').value,
            studentId: document.getElementById('eventStudent').value,
            amount: parseFloat(document.getElementById('eventPaymentAmount').value),
            date: new Date().toISOString(),
            status: 'completed'
        };
        savePayment(eventPaymentData);
        this.reset();
    });
}

function savePayment(paymentData) {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    payments.push(paymentData);
    localStorage.setItem('payments', JSON.stringify(payments));
    
    showSuccessMessage('Payment recorded successfully!');
    loadStats();
    loadTransactions();
}

function loadStats() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    
    // Calculate totals
    const totals = payments.reduce((acc, payment) => {
        if (payment.status === 'completed') {
            acc.total += payment.amount;
            switch(payment.type) {
                case 'offertory':
                    acc.offertory += payment.amount;
                    break;
                case 'subscription':
                    acc.subscriptions += payment.amount;
                    break;
                case 'event':
                    acc.events += payment.amount;
                    break;
            }
        }
        return acc;
    }, { total: 0, offertory: 0, subscriptions: 0, events: 0 });

    // Update display
    document.getElementById('totalCollections').textContent = `$${totals.total.toFixed(2)}`;
    document.getElementById('totalOffertory').textContent = `$${totals.offertory.toFixed(2)}`;
    document.getElementById('totalSubscriptions').textContent = `$${totals.subscriptions.toFixed(2)}`;
    document.getElementById('totalEventPayments').textContent = `$${totals.events.toFixed(2)}`;
}

function loadTransactions() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
    
    tbody.innerHTML = payments
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10) // Show only last 10 transactions
        .map(payment => {
            const student = users.find(u => u.studentId === payment.studentId);
            return `
                <tr>
                    <td>${new Date(payment.date).toLocaleDateString()}</td>
                    <td>${payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}</td>
                    <td>${student ? student.fullName : 'N/A'}</td>
                    <td>$${payment.amount.toFixed(2)}</td>
                    <td><span class="payment-status status-${payment.status}">${payment.status}</span></td>
                </tr>
            `;
        })
        .join('');
}

function populateStudentLists() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const students = users.filter(user => user.role === 'member');
    
    const studentLists = ['subscriptionStudent', 'eventStudent'];
    studentLists.forEach(listId => {
        const select = document.getElementById(listId);
        select.innerHTML = '<option value="">Select Student</option>' +
            students.map(student => 
                `<option value="${student.studentId}">${student.fullName}</option>`
            ).join('');
    });
}

function populateEventList() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const activeEvents = events.filter(event => 
        event.status === 'approved' && 
        new Date(event.date) > new Date() &&
        event.fee > 0
    );
    
    const eventSelect = document.getElementById('eventSelect');
    eventSelect.innerHTML = '<option value="">Select Event</option>' +
        activeEvents.map(event => 
            `<option value="${event.id}">${event.title} ($${event.fee})</option>`
        ).join('');
}

function showTab(tabName) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}

function showSuccessMessage(message) {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    messageElement.textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
} 