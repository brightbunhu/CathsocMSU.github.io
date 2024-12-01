// Initialize sample data for the MSU Catholic Students Union
function initializeData() {
    // Mass Schedule
    const massSchedule = [
        {
            day: 'Sunday',
            time: '07:00',
            location: 'St. Mary\'s Parish',
            type: 'Holy Mass',
            description: 'Weekly Sunday Mass',
            isRegular: true
        },
        {
            day: 'Wednesday',
            time: '18:30',
            location: 'Campus Chapel',
            type: 'Evening Mass',
            description: 'Midweek Mass',
            isRegular: true
        }
    ];

    // Sample user accounts
    const initialUsers = [
        // Father/Chaplain
        {
            studentId: 'CHAP001',
            fullName: 'Father Sima',
            email: 'father.sima@msu.ac.zw',
            phone: '+263 77 123 4567',
            role: 'father',
            password: 'chaplain2024',
            homeParish: 'St Mary\'s Parish Senga',
            profilePic: 'img/father-sima.jpg',
            registrationDate: '2024-01-01'
        },
        // Executive Members
        {
            studentId: 'R2034567X',
            fullName: 'Kudakwashe Tozana',
            email: 'k.tozana@students.msu.ac.zw',
            phone: '+263 71 234 5678',
            role: 'chairman',
            password: 'chairman2024',
            faculty: 'Commerce',
            program: 'Business Management',
            levelOfStudy: '3.2',
            homeParish: 'St Peter\'s Mkoba',
            homeParishPriest: 'Father Moyo',
            profilePic: 'img/chairman.jpg',
            registrationDate: '2024-01-15'
        },
        // Add other users...
    ];

    // Initialize payment records
    const initialPayments = [
        {
            studentId: 'R2067890A',
            type: 'subscription',
            subType: 'national',
            amount: 10.00,
            date: '2024-02-01',
            status: 'completed'
        },
        // Add other payments...
    ];

    // Rosary Mysteries Data
    const rosaryMysteries = {
        Sunday: {
            name: 'Glorious Mysteries',
            mysteries: [
                {
                    title: '1. The Resurrection',
                    description: 'Jesus rises from the dead.',
                    meditation: 'Faith in the resurrection of Jesus and in our own resurrection.'
                },
                {
                    title: '2. The Ascension',
                    description: 'Jesus ascends into Heaven.',
                    meditation: 'Hope in Heaven and desire to bring others there.'
                },
                {
                    title: '3. The Descent of the Holy Spirit',
                    description: 'The Holy Spirit descends upon Mary and the Apostles.',
                    meditation: 'Love of God and zeal for souls.'
                },
                {
                    title: '4. The Assumption',
                    description: 'Mary is taken up into Heaven.',
                    meditation: 'Grace of a happy death and devotion to Mary.'
                },
                {
                    title: '5. The Coronation',
                    description: 'Mary is crowned Queen of Heaven and Earth.',
                    meditation: 'Trust in Mary\'s intercession.'
                }
            ]
        },
        Monday: {
            name: 'Joyful Mysteries',
            mysteries: [
                {
                    title: '1. The Annunciation',
                    description: 'The Angel Gabriel announces to Mary that she will be the Mother of God.',
                    meditation: 'Humility and openness to God\'s will.'
                },
                {
                    title: '2. The Visitation',
                    description: 'Mary visits her cousin Elizabeth.',
                    meditation: 'Love of neighbor and service to others.'
                },
                {
                    title: '3. The Nativity',
                    description: 'Jesus is born in Bethlehem.',
                    meditation: 'Poverty of spirit and detachment from worldly things.'
                },
                {
                    title: '4. The Presentation',
                    description: 'Mary and Joseph present Jesus in the Temple.',
                    meditation: 'Obedience and purity of heart.'
                },
                {
                    title: '5. The Finding in the Temple',
                    description: 'Jesus is found teaching in the Temple.',
                    meditation: 'Devotion to Jesus and joy in finding Him.'
                }
            ]
        },
        // Add other days' mysteries...
    };

    // Store data in localStorage
    if (!localStorage.getItem('massSchedule')) {
        localStorage.setItem('massSchedule', JSON.stringify(massSchedule));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(initialUsers));
    }
    if (!localStorage.getItem('payments')) {
        localStorage.setItem('payments', JSON.stringify(initialPayments));
    }
    if (!localStorage.getItem('rosaryMysteries')) {
        localStorage.setItem('rosaryMysteries', JSON.stringify(rosaryMysteries));
    }
}

// Helper function to get today's rosary mystery
function getRosaryMystery() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    const mysteries = JSON.parse(localStorage.getItem('rosaryMysteries'));
    return {
        day: today,
        ...mysteries[today]
    };
}

// Run initialization if data doesn't exist
if (!localStorage.getItem('massSchedule')) {
    initializeData();
}

// Export for use in other files
window.getRosaryMystery = getRosaryMystery; 