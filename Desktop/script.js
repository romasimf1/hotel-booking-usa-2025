// Демо-данные отелей
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

// DOM элементы
const hotelsContainer = document.getElementById('hotelsContainer');
const modal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const modalHotelName = document.getElementById('modalHotelName');
const closeBtn = document.querySelector('.close');

// Инициализация EmailJS
(function() {
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Замените на ваш публичный ключ
})();

// Загрузка отелей
function loadHotels() {
    hotelsContainer.innerHTML = '';

    hotels.forEach(hotel => {
        const hotelCard = createHotelCard(hotel);
        hotelsContainer.appendChild(hotelCard);
    });
}

// Создание карточки отеля
function createHotelCard(hotel) {
    const card = document.createElement('div');
    card.className = 'hotel-card';

    card.innerHTML = `
        <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
        <div class="hotel-content">
            <h3 class="hotel-name">${hotel.name}</h3>
            <p class="hotel-location">📍 ${hotel.location}</p>
            <p class="hotel-description">${hotel.description}</p>
            <div class="hotel-features">
                ${hotel.features.map(feature => `<span class="feature">${feature}</span>`).join('')}
            </div>
            <p class="hotel-price">${hotel.price}</p>
            <button class="book-btn" data-hotel-id="${hotel.id}">Book Now</button>
        </div>
    `;

    // Обработчик кнопки бронирования
    const bookBtn = card.querySelector('.book-btn');
    bookBtn.addEventListener('click', () => openBookingModal(hotel));

    return card;
}

// Открытие модального окна бронирования
function openBookingModal(hotel) {
    modalHotelName.textContent = `Book: ${hotel.name}`;
    document.getElementById('hotelId').value = hotel.id;
    document.getElementById('hotelName').value = hotel.name;

    // Устанавливаем ограничения на даты
    setDateConstraints();

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Установка ограничений на даты
function setDateConstraints() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');

    // Форматируем даты в YYYY-MM-DD
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Устанавливаем минимальную дату для check-in (сегодня)
    checkInInput.min = todayStr;
    checkInInput.value = tomorrowStr; // По умолчанию завтра

    // Устанавливаем минимальную дату для check-out (день после check-in)
    checkOutInput.min = tomorrowStr;
    checkOutInput.value = getDayAfter(tomorrowStr); // По умолчанию послезавтра

    // Добавляем обработчик изменения даты check-in
    checkInInput.addEventListener('change', function() {
        updateCheckOutMin(this.value);
    });
}

// Получить дату на следующий день после указанной
function getDayAfter(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}

// Обновить минимальную дату для check-out
function updateCheckOutMin(checkInDate) {
    const checkOutInput = document.getElementById('checkOut');
    const nextDay = getDayAfter(checkInDate);

    checkOutInput.min = nextDay;

    // Если текущая дата check-out раньше новой минимальной, обновляем её
    if (checkOutInput.value < nextDay) {
        checkOutInput.value = nextDay;
    }
}

// Закрытие модального окна
function closeBookingModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    bookingForm.reset();
}

// Обработчик отправки формы
bookingForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Дополнительная валидация дат перед отправкой
    const checkInDate = new Date(bookingForm.checkIn.value);
    const checkOutDate = new Date(bookingForm.checkOut.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
        showNotification('Check-in date cannot be in the past', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Booking';
        return;
    }

    if (checkOutDate <= checkInDate) {
        showNotification('Check-out date must be after check-in date', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Booking';
        return;
    }

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(this);

    const bookingData = {
        guest_name: formData.get('guest_name'),
        guest_email: formData.get('guest_email'),
        guest_phone: formData.get('guest_phone'),
        check_in: formData.get('check_in'),
        check_out: formData.get('check_out'),
        guests: formData.get('guests'),
        hotel_id: formData.get('hotel_id'),
        hotel_name: formData.get('hotel_name'),
        booking_date: new Date().toLocaleString('en-US')
    };

    try {
        // Отправка через EmailJS
        await emailjs.send(
            'YOUR_EMAILJS_SERVICE_ID', // Замените на ваш Service ID
            'YOUR_EMAILJS_TEMPLATE_ID', // Замените на ваш Template ID
            bookingData
        );

        showNotification('Booking request sent! Check your email for confirmation.', 'success');
        closeBookingModal();

    } catch (error) {
        console.error('Ошибка отправки:', error);
        showNotification('Error sending booking request. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Booking';
    }
});

// Показ уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'error' : ''}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Обработчики событий
closeBtn.addEventListener('click', closeBookingModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeBookingModal();
    }
});

// Инициализация ElevenLabs AI ассистента
function initElevenLabsWidget() {
    const widget = document.getElementById('elevenlabs-widget');

    // Создаем виджет ElevenLabs
    const convaiWidget = document.createElement('elevenlabs-convai');
    convaiWidget.setAttribute('agent-id', 'YOUR_ELEVENLABS_AGENT_ID'); // Замените на ваш Agent ID

    widget.appendChild(convaiWidget);
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    loadHotels();
    initElevenLabsWidget();
});

// Функции для работы без API (для GitHub Pages)
function fetchHotels() {
    // Возвращаем локальные данные отелей
    return Promise.resolve({
        success: true,
        data: hotels,
        count: hotels.length
    });
}

async function submitBooking(bookingData) {
    // Имитация отправки бронирования (для демо)
    console.log('Booking data:', bookingData);

    // Имитируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Возвращаем успешный результат
    return {
        success: true,
        data: {
            booking_id: `BK${Date.now()}`,
            status: 'confirmed',
            message: 'Booking request sent! Check your email for confirmation.'
        }
    };
}
