document.addEventListener('DOMContentLoaded', function() {
    loadDailyPrayer();
    loadRosaryMysteries();
});

// Daily prayers rotation
const dailyPrayers = [
    {
        text: "Lord, make me an instrument of your peace. Where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith; where there is despair, hope; where there is darkness, light; where there is sadness, joy.",
        author: "Prayer of St. Francis"
    },
    {
        text: "Come, Holy Spirit, fill the hearts of your faithful and kindle in them the fire of your love. Send forth your Spirit and they shall be created. And you shall renew the face of the earth.",
        author: "Prayer to the Holy Spirit"
    },
    {
        text: "O God, who has taught the hearts of the faithful by the light of the Holy Spirit, grant that by the gift of the same Spirit we may be always truly wise and ever rejoice in His consolation.",
        author: "Prayer for Divine Guidance"
    },
    {
        text: "Lord Jesus, I give you my hands to do your work. I give you my feet to go your way. I give you my eyes to see as you do. I give you my tongue to speak your words. I give you my mind that you may think in me. I give you my spirit that you may pray in me.",
        author: "Prayer of Surrender"
    },
    {
        text: "Grant me, O Lord my God, a mind to know you, a heart to seek you, wisdom to find you, conduct pleasing to you, faithful perseverance in waiting for you, and a hope of finally embracing you.",
        author: "Prayer of St. Thomas Aquinas"
    }
];

function loadDailyPrayer() {
    const dailyPrayerElement = document.getElementById('dailyPrayer');
    // Get day of year to rotate prayers
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const prayer = dailyPrayers[dayOfYear % dailyPrayers.length];
    
    dailyPrayerElement.innerHTML = `
        <p class="prayer-text">${prayer.text}</p>
        <p class="prayer-author">- ${prayer.author}</p>
    `;
}

function loadRosaryMysteries() {
    const rosaryElement = document.getElementById('rosaryMystery');
    const rosaryDetails = document.getElementById('rosaryDetails');
    const rosaryReadMore = document.getElementById('rosaryReadMore');
    
    if (rosaryElement && rosaryDetails && rosaryReadMore) {
        const todaysMystery = getRosaryMystery();
        rosaryElement.textContent = `${todaysMystery.name} (${todaysMystery.day})`;
        
        // Populate mysteries list
        const mysteriesList = rosaryDetails.querySelector('.mysteries-list');
        mysteriesList.innerHTML = todaysMystery.mysteries.map(mystery => `
            <div class="mystery-item">
                <h4>${mystery.title}</h4>
                <p>${mystery.description}</p>
                <p class="mystery-meditation">Meditation: ${mystery.meditation}</p>
            </div>
        `).join('');
        
        // Toggle read more functionality
        rosaryReadMore.addEventListener('click', function() {
            if (rosaryDetails.style.display === 'none') {
                rosaryDetails.style.display = 'block';
                this.textContent = 'Show Less';
            } else {
                rosaryDetails.style.display = 'none';
                this.textContent = 'Read Full Mysteries';
            }
        });
    }
}

// Get Rosary Mystery (using the function from init-data.js)
function getRosaryMystery() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    return {
        day: today,
        ...ROSARY_MYSTERIES[today]
    };
} 