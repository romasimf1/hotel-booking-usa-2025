// USA Hotels data for 2025
const hotels = [
    {
        id: 1,
        name: "The Plaza Hotel",
        location: "New York, USA",
        description: "Luxurious hotel in the heart of Manhattan with Central Park views. Perfect for business trips and luxury stays.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        price: "from $450/night",
        features: ["Wi-Fi", "Spa", "Fitness Center", "Restaurant"],
        rating: 4.8
    },
    {
        id: 2,
        name: "The Ritz-Carlton",
        location: "Los Angeles, USA",
        description: "Elegant beachfront hotel in Santa Monica. Excellent for celebrity sightings and luxury beach vacations.",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400",
        price: "from $380/night",
        features: ["Ocean View", "Pool", "Kids Club", "Water Park"],
        rating: 4.6
    },
    {
        id: 3,
        name: "The Stanley Hotel",
        location: "Estes Park, Colorado, USA",
        description: "Historic mountain lodge inspired by the Rocky Mountains. Perfect for skiing enthusiasts and nature lovers.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
        price: "from $520/night",
        features: ["Ski Resort", "Cafe", "Sauna", "Shuttle"],
        rating: 4.7
    },
    {
        id: 4,
        name: "Hotel Nikko",
        location: "San Francisco, USA",
        description: "Modern hotel in the heart of downtown. Close to major attractions and business district.",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
        price: "from $290/night",
        features: ["Downtown", "Parking", "Air Conditioning", "Wi-Fi"],
        rating: 4.5
    },
    {
        id: 5,
        name: "Four Seasons",
        location: "Chicago, USA",
        description: "Premium business hotel with state-of-the-art conference facilities and executive services.",
        image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400",
        price: "from $600/night",
        features: ["Conference Rooms", "Business Center", "Gym", "Valet Parking"],
        rating: 4.9
    },
    {
        id: 6,
        name: "The Jefferson",
        location: "Washington D.C., USA",
        description: "Historic hotel on Capitol Hill with panoramic views and elegant rooms.",
        image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=400",
        price: "from $350/night",
        features: ["Capitol View", "Terrace", "Bar", "Valet Parking"],
        rating: 4.4
    },
    {
        id: 7,
        name: "The Breakers",
        location: "Palm Beach, Florida, USA",
        description: "Grand resort with expansive gardens and pools. Perfect for relaxation and spa treatments.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
        price: "from $480/night",
        features: ["Spa", "Pool", "Garden", "Restaurant"],
        rating: 4.6
    },
    {
        id: 8,
        name: "The Inn at Little Washington",
        location: "Washington, Virginia, USA",
        description: "Charming boutique inn in the historic center of an ancient town with authentic atmosphere.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
        price: "from $280/night",
        features: ["Historic District", "Breakfast", "Tours", "Parking"],
        rating: 4.3
    },
    {
        id: 9,
        name: "Hilton Garden Inn",
        location: "Las Vegas, Nevada, USA",
        description: "Convenient airport hotel for transit passengers and short stays near the entertainment capital.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        price: "from $150/night",
        features: ["Airport Access", "Shuttle", "Parking", "Restaurant"],
        rating: 4.2
    },
    {
        id: 10,
        name: "Lake Tahoe Resort",
        location: "South Lake Tahoe, California, USA",
        description: "Stunning lakefront resort overlooking Lake Tahoe. Perfect for nature lovers and outdoor enthusiasts.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        price: "from $420/night",
        features: ["Lake View", "Nature Trails", "Boat Tours", "Restaurant"],
        rating: 4.8
    }
];

// DOM elements
const hotelsContainer = document.getElementById('hotelsContainer');
const modal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const modalHotelName = document.getElementById('modalHotelName');
const closeBtn = document.querySelector('.close');
const searchInput = document.getElementById('searchInput');
const locationFilter = document.getElementById('locationFilter');
const priceFilter = document.getElementById('priceFilter');
const ratingFilter = document.getElementById('ratingFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const hotelsCount = document.getElementById('hotelsCount');
const noResults = document.getElementById('noResults');

// Store filtered hotels
let filteredHotels = [...hotels];

// Initialize EmailJS (v4)
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // Replace with your public key
            blockHeadless: true,
            blockList: {
                list: [],
                watchVariable: null
            }
        });
    }
})();

// Booking Management System
const BOOKINGS_STORAGE_KEY = 'hotel_bookings';

// Get all bookings from localStorage
function getBookings() {
    const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

// Save booking to localStorage
function saveBooking(booking) {
    const bookings = getBookings();
    bookings.push(booking);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    return booking;
}

// Delete booking by ID
function deleteBooking(bookingId) {
    const bookings = getBookings();
    const filtered = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(filtered));
    return filtered.length < bookings.length;
}

// Get booked dates for a specific hotel
function getBookedDates(hotelId) {
    const bookings = getBookings();
    const hotelBookings = bookings.filter(b => 
        b.hotel_id == hotelId && 
        (b.status === 'confirmed' || b.status === 'pending')
    );
    
    const bookedDates = new Set();
    
    hotelBookings.forEach(booking => {
        const checkIn = new Date(booking.check_in);
        const checkOut = new Date(booking.check_out);
        
        // Add all dates between check-in and check-out (excluding check-out date)
        const currentDate = new Date(checkIn);
        while (currentDate < checkOut) {
            bookedDates.add(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    });
    
    return bookedDates;
}

// Check if date range is available for a hotel
function isDateRangeAvailable(hotelId, checkIn, checkOut) {
    const bookedDates = getBookedDates(hotelId);
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    const currentDate = new Date(checkInDate);
    while (currentDate < checkOutDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (bookedDates.has(dateStr)) {
            return false;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return true;
}

// Generate list of dates to disable (for date input)
function getDisabledDates(hotelId) {
    const bookedDates = getBookedDates(hotelId);
    return Array.from(bookedDates);
}

// Generate star rating HTML
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star filled">★</span>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<span class="star half">★</span>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star">☆</span>';
    }
    
    return `<div class="hotel-rating" title="${rating} stars">${starsHTML} <span class="rating-value">${rating}</span></div>`;
}

// Extract numeric price from price string
function getPriceNumber(priceStr) {
    return parseInt(priceStr.replace(/\D/g, ''));
}

// Filter hotels based on search and filters
function filterHotels() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const location = locationFilter.value;
    const priceRange = priceFilter.value;
    const minRating = parseFloat(ratingFilter.value) || 0;

    filteredHotels = hotels.filter(hotel => {
        // Search filter
        const matchesSearch = !searchTerm || 
            hotel.name.toLowerCase().includes(searchTerm) ||
            hotel.location.toLowerCase().includes(searchTerm) ||
            hotel.description.toLowerCase().includes(searchTerm);

        // Location filter
        const matchesLocation = !location || hotel.location.includes(location);

        // Price filter
        let matchesPrice = true;
        if (priceRange) {
            const price = getPriceNumber(hotel.price);
            if (priceRange.includes('+')) {
                matchesPrice = price >= 600;
            } else {
                const [min, max] = priceRange.split('-').map(Number);
                matchesPrice = price >= min && price <= max;
            }
        }

        // Rating filter
        const matchesRating = hotel.rating >= minRating;

        return matchesSearch && matchesLocation && matchesPrice && matchesRating;
    });

    displayHotels();
    updateHotelsCount();
}

// Update hotels count display
function updateHotelsCount() {
    const count = filteredHotels.length;
    if (count === 0) {
        hotelsCount.textContent = '';
        noResults.style.display = 'block';
    } else {
        hotelsCount.textContent = `Found ${count} hotel${count !== 1 ? 's' : ''}`;
        noResults.style.display = 'none';
    }
}

// Display filtered hotels
function displayHotels() {
    hotelsContainer.innerHTML = '';

    if (filteredHotels.length === 0) {
        return;
    }

    filteredHotels.forEach(hotel => {
        const hotelCard = createHotelCard(hotel);
        hotelsContainer.appendChild(hotelCard);
    });
}

// Load hotels (initial load)
function loadHotels() {
    filteredHotels = [...hotels];
    displayHotels();
    updateHotelsCount();
}

// Create hotel card
function createHotelCard(hotel) {
    const card = document.createElement('div');
    card.className = 'hotel-card';

    // Check if hotel has bookings
    const bookedDates = getBookedDates(hotel.id);
    const hasBookings = bookedDates.size > 0;
    const bookingBadge = hasBookings ? '<span class="booking-badge">⚠️ Есть бронирования</span>' : '';

    card.innerHTML = `
        <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image" loading="lazy">
        <div class="hotel-content">
            <h3 class="hotel-name">${hotel.name} ${bookingBadge}</h3>
            <p class="hotel-location">📍 ${hotel.location}</p>
            ${generateRatingStars(hotel.rating)}
            <p class="hotel-description">${hotel.description}</p>
            <div class="hotel-features">
                ${hotel.features.map(feature => `<span class="feature">${feature}</span>`).join('')}
            </div>
            <p class="hotel-price">${hotel.price}</p>
            <button class="book-btn" data-hotel-id="${hotel.id}">Book Now</button>
        </div>
    `;

    // Add click handler
    const bookBtn = card.querySelector('.book-btn');
    bookBtn.addEventListener('click', () => openBookingModal(hotel));

    return card;
}

// Open booking modal
function openBookingModal(hotel) {
    modalHotelName.textContent = `Book: ${hotel.name}`;
    document.getElementById('hotelId').value = hotel.id;
    document.getElementById('hotelName').value = hotel.name;

    // Set date constraints with booked dates blocking
    setDateConstraints(hotel.id);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close booking modal
function closeBookingModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    bookingForm.reset();
    
    // Remove error messages
    const errorMsg = document.querySelector('.date-error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
    
    // Reset border colors
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    if (checkInInput) checkInInput.style.borderColor = '#ecf0f1';
    if (checkOutInput) checkOutInput.style.borderColor = '#ecf0f1';
}

// Set date constraints with booked dates blocking
function setDateConstraints(hotelId) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');

    // Format dates as YYYY-MM-DD
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Set min date for check-in (today)
    checkInInput.min = todayStr;
    
    // Get booked dates for this hotel
    const bookedDates = getBookedDates(hotelId);
    
    // Find first available date
    let suggestedCheckIn = tomorrowStr;
    if (bookedDates.has(suggestedCheckIn)) {
        // Find next available date
        let checkDate = new Date(suggestedCheckIn);
        while (bookedDates.has(checkDate.toISOString().split('T')[0])) {
            checkDate.setDate(checkDate.getDate() + 1);
            if (checkDate > new Date('2026-12-31')) break; // Safety limit
        }
        suggestedCheckIn = checkDate.toISOString().split('T')[0];
    }
    
    checkInInput.value = suggestedCheckIn;
    
    // Set min date for check-out (day after check-in)
    const suggestedCheckOut = getDayAfter(suggestedCheckIn);
    checkOutInput.min = suggestedCheckOut;
    checkOutInput.value = suggestedCheckOut;

    // Add change listener for check-in
    checkInInput.addEventListener('change', function() {
        updateCheckOutMin(this.value, hotelId);
        validateDateAvailability(hotelId);
    });
    
    // Add change listener for check-out
    checkOutInput.addEventListener('change', function() {
        validateDateAvailability(hotelId);
    });
    
    // Add validation on input
    validateDateAvailability(hotelId);
}

// Get date one day after specified date
function getDayAfter(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}

// Update minimum date for check-out
function updateCheckOutMin(checkInDate, hotelId) {
    const checkOutInput = document.getElementById('checkOut');
    const nextDay = getDayAfter(checkInDate);

    checkOutInput.min = nextDay;

    // If current check-out is before new min, update it
    if (checkOutInput.value < nextDay) {
        checkOutInput.value = nextDay;
    }
    
    // If check-out date is booked, find next available
    const bookedDates = getBookedDates(hotelId);
    let checkOutDate = new Date(checkOutInput.value);
    while (bookedDates.has(checkOutDate.toISOString().split('T')[0])) {
        checkOutDate.setDate(checkOutDate.getDate() + 1);
        if (checkOutDate > new Date('2026-12-31')) break;
    }
    checkOutInput.value = checkOutDate.toISOString().split('T')[0];
}

// Validate date availability and show message
function validateDateAvailability(hotelId) {
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    
    // Remove previous error message
    const existingError = document.querySelector('.date-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (!checkIn || !checkOut) return;
    
    const bookedDates = getBookedDates(hotelId);
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Check if any date in range is booked
    const currentDate = new Date(checkInDate);
    let conflictDates = [];
    
    while (currentDate < checkOutDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (bookedDates.has(dateStr)) {
            conflictDates.push(dateStr);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    if (conflictDates.length > 0) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'date-error-message';
        errorMsg.style.color = '#e74c3c';
        errorMsg.style.fontSize = '0.9rem';
        errorMsg.style.marginTop = '10px';
        errorMsg.textContent = `⚠️ Эти даты уже забронированы. Пожалуйста, выберите другие даты.`;
        checkOutInput.parentNode.appendChild(errorMsg);
        
        checkInInput.style.borderColor = '#e74c3c';
        checkOutInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        checkInInput.style.borderColor = '#ecf0f1';
        checkOutInput.style.borderColor = '#ecf0f1';
        return true;
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const hotelId = document.getElementById('hotelId').value;
    const checkIn = bookingForm.checkIn.value;
    const checkOut = bookingForm.checkOut.value;

    // Validate dates before sending
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
        showNotification('Дата заезда не может быть в прошлом', 'error');
        return;
    }

    if (checkOutDate <= checkInDate) {
        showNotification('Дата выезда должна быть позже даты заезда', 'error');
        return;
    }

    // Check if dates are available
    if (!isDateRangeAvailable(hotelId, checkIn, checkOut)) {
        showNotification('Выбранные даты уже забронированы. Пожалуйста, выберите другие даты.', 'error');
        validateDateAvailability(hotelId);
        return;
    }

    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';

    const formData = new FormData(bookingForm);

    // Generate booking ID
    const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    const bookingData = {
        id: bookingId,
        guest_name: formData.get('guest_name'),
        guest_email: formData.get('guest_email'),
        guest_phone: formData.get('guest_phone'),
        check_in: checkIn,
        check_out: checkOut,
        guests: formData.get('guests'),
        hotel_id: formData.get('hotel_id'),
        hotel_name: formData.get('hotel_name'),
        status: 'confirmed',
        booking_date: new Date().toLocaleString('en-US'),
        created_at: new Date().toISOString()
    };

    // Save booking to localStorage
    saveBooking(bookingData);

    // Try to send email (optional)
    try {
        if (typeof emailjs !== 'undefined' && emailjs.init) {
            emailjs.send(
                'YOUR_EMAILJS_SERVICE_ID',
                'YOUR_EMAILJS_TEMPLATE_ID',
                bookingData
            ).catch(err => {
                console.log('EmailJS not configured, booking saved locally');
            });
        }
    } catch (error) {
        console.log('EmailJS not configured, booking saved locally');
    }

    showNotification(`Бронирование успешно создано! ID: ${bookingId}`, 'success');
    closeBookingModal();
    
    // Refresh hotel display to update badges
    displayHotels();
    
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
}

bookingForm.addEventListener('submit', handleFormSubmit);

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'error' : ''}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Event listeners
closeBtn.addEventListener('click', closeBookingModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeBookingModal();
    }
});

// Search and filter event listeners
if (searchInput) {
    searchInput.addEventListener('input', filterHotels);
}

if (locationFilter) {
    locationFilter.addEventListener('change', filterHotels);
}

if (priceFilter) {
    priceFilter.addEventListener('change', filterHotels);
}

if (ratingFilter) {
    ratingFilter.addEventListener('change', filterHotels);
}

if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        locationFilter.value = '';
        priceFilter.value = '';
        ratingFilter.value = '';
        filterHotels();
    });
}

// Initialize ElevenLabs AI assistant with error handling
function initElevenLabsWidget() {
    const widget = document.getElementById('elevenlabs-widget');
    if (!widget) return;

    const agentId = 'YOUR_ELEVENLABS_AGENT_ID'; // Replace with your Agent ID
    
    // Only initialize if agent ID is configured
    if (!agentId || agentId === 'YOUR_ELEVENLABS_AGENT_ID') {
        console.log('ElevenLabs widget not configured - agent ID required');
        widget.style.display = 'none';
        return;
    }

    try {
        // Create ElevenLabs widget
        const convaiWidget = document.createElement('elevenlabs-convai');
        convaiWidget.setAttribute('agent-id', agentId);
        
        widget.appendChild(convaiWidget);
    } catch (error) {
        console.error('Error initializing ElevenLabs widget:', error);
        widget.style.display = 'none';
    }
}

// View and cancel bookings
function showBookingsModal() {
    const bookings = getBookings();
    
    if (bookings.length === 0) {
        showNotification('У вас нет активных бронирований', 'error');
        return;
    }
    
    // Create modal HTML
    const bookingsModal = document.createElement('div');
    bookingsModal.className = 'modal';
    bookingsModal.id = 'bookingsModal';
    bookingsModal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <span class="close-bookings">&times;</span>
            <h2 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; margin: 0; border-radius: 15px 15px 0 0;">Мои бронирования</h2>
            <div style="padding: 20px; max-height: 500px; overflow-y: auto;">
                ${bookings.map(booking => `
                    <div class="booking-item" style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 15px; margin-bottom: 15px;">
                        <h3 style="margin: 0 0 10px 0; color: #2c3e50;">${booking.hotel_name}</h3>
                        <p style="margin: 5px 0; color: #7f8c8d;"><strong>Гость:</strong> ${booking.guest_name}</p>
                        <p style="margin: 5px 0; color: #7f8c8d;"><strong>Email:</strong> ${booking.guest_email}</p>
                        <p style="margin: 5px 0; color: #7f8c8d;"><strong>Телефон:</strong> ${booking.guest_phone}</p>
                        <p style="margin: 5px 0; color: #7f8c8d;"><strong>Заезд:</strong> ${new Date(booking.check_in).toLocaleDateString('ru-RU')}</p>
                        <p style="margin: 5px 0; color: #7f8c8d;"><strong>Выезд:</strong> ${new Date(booking.check_out).toLocaleDateString('ru-RU')}</p>
                        <p style="margin: 5px 0; color: #7f8c8d;"><strong>Гостей:</strong> ${booking.guests}</p>
                        <p style="margin: 5px 0; color: #7f8c8d;"><strong>ID бронирования:</strong> ${booking.id}</p>
                        <p style="margin: 5px 0; color: #27ae60;"><strong>Статус:</strong> ${booking.status === 'confirmed' ? 'Подтверждено' : booking.status}</p>
                        <button class="cancel-booking-btn" data-booking-id="${booking.id}" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 10px;">Отменить бронирование</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(bookingsModal);
    bookingsModal.style.display = 'block';
    
    // Close modal handlers
    const closeBtn = bookingsModal.querySelector('.close-bookings');
    closeBtn.addEventListener('click', () => {
        bookingsModal.remove();
    });
    
    bookingsModal.addEventListener('click', (e) => {
        if (e.target === bookingsModal) {
            bookingsModal.remove();
        }
    });
    
    // Cancel booking handlers
    const cancelButtons = bookingsModal.querySelectorAll('.cancel-booking-btn');
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-booking-id');
            if (confirm('Вы уверены, что хотите отменить это бронирование?')) {
                cancelBooking(bookingId);
                bookingsModal.remove();
            }
        });
    });
}

// Cancel booking
function cancelBooking(bookingId) {
    if (deleteBooking(bookingId)) {
        showNotification('Бронирование успешно отменено. Даты освобождены.', 'success');
        // Refresh hotel display to update badges
        displayHotels();
    } else {
        showNotification('Ошибка при отмене бронирования', 'error');
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadHotels();
    initElevenLabsWidget();
    
    // Add "My Bookings" button to header
    const heroSection = document.querySelector('.hero-section .container');
    if (heroSection) {
        const bookingsBtn = document.createElement('button');
        bookingsBtn.textContent = '📋 Мои бронирования';
        bookingsBtn.className = 'my-bookings-btn';
        bookingsBtn.style.cssText = 'background: rgba(255,255,255,0.2); border: 2px solid white; color: white; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-size: 1rem; font-weight: 600; margin-top: 20px; transition: all 0.3s ease;';
        bookingsBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.3)';
            this.style.transform = 'scale(1.05)';
        });
        bookingsBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.2)';
            this.style.transform = 'scale(1)';
        });
        bookingsBtn.addEventListener('click', showBookingsModal);
        heroSection.appendChild(bookingsBtn);
    }
});