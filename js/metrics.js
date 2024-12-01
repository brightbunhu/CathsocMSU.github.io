document.addEventListener('DOMContentLoaded', function() {
    // Check if user has permission to view metrics
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !['treasurer', 'father', 'chairman'].includes(currentUser.role)) {
        window.location.href = 'login.html';
    }

    loadMetrics();
    initializeCharts();
    loadTables();
    initializeFilters();
});

function loadMetrics() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    
    // Calculate totals
    const totals = calculateTotals(payments);
    
    // Update summary cards
    document.getElementById('totalCollections').textContent = `$${totals.total.toFixed(2)}`;
    document.getElementById('semesterOffertory').textContent = `$${totals.semesterOffertory.toFixed(2)}`;
    document.getElementById('totalSubscriptions').textContent = `$${totals.subscriptions.toFixed(2)}`;
    document.getElementById('eventRevenue').textContent = `$${totals.events.toFixed(2)}`;
}

function calculateTotals(payments) {
    const semesterStart = getSemesterStartDate();
    
    return payments.reduce((acc, payment) => {
        if (payment.status === 'completed') {
            acc.total += payment.amount;
            
            const paymentDate = new Date(payment.date);
            if (payment.type === 'offertory' && paymentDate >= semesterStart) {
                acc.semesterOffertory += payment.amount;
            }
            
            if (payment.type === 'subscription') {
                acc.subscriptions += payment.amount;
            }
            
            if (payment.type === 'event') {
                acc.events += payment.amount;
            }
        }
        return acc;
    }, { total: 0, semesterOffertory: 0, subscriptions: 0, events: 0 });
}

function initializeCharts() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    
    // Offertory Trends Chart
    new Chart(document.getElementById('offertoryChart'), {
        type: 'line',
        data: getOffertoryChartData(payments),
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Subscription Distribution Chart
    new Chart(document.getElementById('subscriptionChart'), {
        type: 'pie',
        data: getSubscriptionChartData(payments),
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // Revenue Sources Chart
    new Chart(document.getElementById('revenueSourcesChart'), {
        type: 'doughnut',
        data: getRevenueSourcesData(payments),
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // Monthly Trends Chart
    new Chart(document.getElementById('monthlyTrendsChart'), {
        type: 'bar',
        data: getMonthlyTrendsData(payments),
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function loadTables() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];

    // Load Offertory Table
    loadOffertoryTable(payments);
    
    // Load Subscription Table
    loadSubscriptionTable(payments, users);
    
    // Load Event Payments Table
    loadEventPaymentsTable(payments, users, events);
}

function loadOffertoryTable(payments) {
    const offertoryPayments = payments.filter(p => p.type === 'offertory');
    const tbody = document.getElementById('offertoryTable').getElementsByTagName('tbody')[0];
    
    tbody.innerHTML = offertoryPayments
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(payment => {
            const date = new Date(payment.date);
            return `
                <tr>
                    <td>${date.toLocaleDateString()}</td>
                    <td>$${payment.amount.toFixed(2)}</td>
                    <td>Week ${getWeekNumber(date)}</td>
                    <td>${date.toLocaleString('default', { month: 'long' })}</td>
                </tr>
            `;
        })
        .join('');
}

function loadSubscriptionTable(payments, users) {
    const subscriptionPayments = payments.filter(p => p.type === 'subscription');
    const tbody = document.getElementById('subscriptionTable').getElementsByTagName('tbody')[0];
    
    tbody.innerHTML = subscriptionPayments
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(payment => {
            const student = users.find(u => u.studentId === payment.studentId);
            return `
                <tr data-type="${payment.subType}">
                    <td>${student ? student.fullName : 'Unknown'}</td>
                    <td>${payment.subType}</td>
                    <td>$${payment.amount.toFixed(2)}</td>
                    <td>${new Date(payment.date).toLocaleDateString()}</td>
                    <td><span class="status-${payment.status}">${payment.status}</span></td>
                </tr>
            `;
        })
        .join('');
}

function loadEventPaymentsTable(payments, users, events) {
    const eventPayments = payments.filter(p => p.type === 'event');
    const tbody = document.getElementById('eventPaymentsTable').getElementsByTagName('tbody')[0];
    
    tbody.innerHTML = eventPayments
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(payment => {
            const student = users.find(u => u.studentId === payment.studentId);
            const event = events.find(e => e.id === payment.eventId);
            return `
                <tr>
                    <td>${event ? event.title : 'Unknown Event'}</td>
                    <td>${student ? student.fullName : 'Unknown'}</td>
                    <td>$${payment.amount.toFixed(2)}</td>
                    <td>${new Date(payment.date).toLocaleDateString()}</td>
                    <td><span class="status-${payment.status}">${payment.status}</span></td>
                </tr>
            `;
        })
        .join('');
}

// Helper functions for charts data
function getOffertoryChartData(payments) {
    // Implementation for offertory trends chart data
}

function getSubscriptionChartData(payments) {
    // Implementation for subscription distribution chart data
}

function getRevenueSourcesData(payments) {
    // Implementation for revenue sources chart data
}

function getMonthlyTrendsData(payments) {
    // Implementation for monthly trends chart data
}

// Utility functions
function getSemesterStartDate() {
    // Logic to determine semester start date
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return new Date(year, month < 6 ? 0 : 6, 1);
}

function getWeekNumber(date) {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - firstDay) / 86400000) + firstDay.getDay() + 1) / 7);
}

function initializeFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.type;
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter table rows
            const rows = document.querySelectorAll('#subscriptionTable tbody tr');
            rows.forEach(row => {
                if (type === 'all' || row.dataset.type === type) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
} 