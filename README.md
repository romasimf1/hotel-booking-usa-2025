# 🏨 USA Hotel Booking 2025

A beautiful, responsive hotel booking website featuring 10 premium USA hotels with 2025 pricing in USD. Built with HTML, CSS, and JavaScript.

![Hotel Booking Preview](https://img.shields.io/badge/Status-Ready-green)
![GitHub Pages](https://img.shields.io/badge/Hosted-GitHub%20Pages-blue)

## ✨ Features

- 🏨 **10 Premium USA Hotels** - Featuring luxury hotels across major US cities
- 💰 **2025 USD Pricing** - Competitive rates in American dollars
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🤖 **AI Assistant** - Powered by ElevenLabs conversational AI
- 📧 **Email Integration** - EmailJS for booking confirmations
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 🗓️ **Date Validation** - Prevents booking past dates and enforces logical date ranges

## 🏨 Featured Hotels

| Hotel | Location | Price/Night | Rating |
|-------|----------|-------------|--------|
| The Plaza Hotel | New York | $450 | ⭐⭐⭐⭐⭐ |
| The Ritz-Carlton | Los Angeles | $380 | ⭐⭐⭐⭐⭐ |
| The Stanley Hotel | Colorado | $520 | ⭐⭐⭐⭐⭐ |
| Hotel Nikko | San Francisco | $290 | ⭐⭐⭐⭐⭐ |
| Four Seasons | Chicago | $600 | ⭐⭐⭐⭐⭐ |
| The Jefferson | Washington D.C. | $350 | ⭐⭐⭐⭐ |
| The Breakers | Florida | $480 | ⭐⭐⭐⭐⭐ |
| The Inn at Little Washington | Virginia | $280 | ⭐⭐⭐⭐ |
| Hilton Garden Inn | Las Vegas | $150 | ⭐⭐⭐⭐ |
| Lake Tahoe Resort | California | $420 | ⭐⭐⭐⭐⭐ |

## 🚀 Live Demo

[🌐 View Live Site](https://romasimf1.github.io/hotel-booking-usa-2025/)

## 📱 Screenshots

### Desktop View
Modern, responsive design with beautiful gradients and hotel cards.

### Mobile View
Optimized for mobile devices with touch-friendly buttons.

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with Flexbox & Grid
- **Icons:** Unicode emojis & custom styling
- **Email Service:** EmailJS
- **AI Assistant:** ElevenLabs Conversational AI
- **Hosting:** GitHub Pages (Free!)
- **Deployment:** GitHub Actions (Automated)

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/hotel-booking-usa-2025.git
cd hotel-booking-usa-2025
```

### 2. Open in Browser
Simply open `index.html` in your web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if available)
npx serve .

# Then visit http://localhost:8000
```

### 3. Configure API Keys (Optional)

For full functionality, configure these services:

#### EmailJS Setup:
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create account and get your keys
3. Update `script.js`:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

#### ElevenLabs AI Setup:
1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Create Conversational AI agent
3. Update `script.js`:
```javascript
convaiWidget.setAttribute('agent-id', 'YOUR_AGENT_ID');
```

## 🎯 Usage

1. **Browse Hotels** - Scroll through our curated selection of premium USA hotels
2. **View Details** - Click on any hotel card to see amenities and pricing
3. **Book Now** - Fill out the booking form with your details
4. **Date Validation** - System prevents invalid date selections
5. **AI Assistant** - Chat with our AI assistant in the bottom-right corner
6. **Confirmation** - Receive email confirmation (when EmailJS is configured)

## 🎨 Customization

### Adding New Hotels
Edit the `hotels` array in `script.js`:

```javascript
{
    id: 11,
    name: "Your Hotel Name",
    location: "City, State, USA",
    description: "Hotel description...",
    image: "image_url",
    price: "from $XXX/night",
    features: ["Feature 1", "Feature 2"],
    rating: 4.8
}
```

### Styling Changes
Modify `styles.css` to customize colors, fonts, and layout.

## 📱 Responsive Design

- **Desktop:** Full grid layout with hover effects
- **Tablet:** 2-column grid with optimized spacing
- **Mobile:** Single column with touch-friendly buttons

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Images:** Unsplash for beautiful hotel photos
- **Icons:** Unicode emojis for consistent cross-platform display
- **Fonts:** System fonts for optimal performance
- **Inspiration:** Modern web design trends and UX best practices

## 📞 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/hotel-booking-usa-2025/issues)
- 💡 Feature Requests: [GitHub Discussions](https://github.com/YOUR_USERNAME/hotel-booking-usa-2025/discussions)

---

⭐ **Star this repo** if you found it helpful!

Made with ❤️ for the USA hotel booking experience in 2025



