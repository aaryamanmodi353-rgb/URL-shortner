 ## URLShortner: 
 A Premium MERN Stack Shortener
Developed by Aaryaman Modi, this project is a high-performance URL shortening service designed with a focus on modern Glassmorphism aesthetics and efficient backend architecture. It provides a full-stack solution for creating, managing, and tracking shortened links with a user-friendly dashboard.

## 🌟 Key Features
Glassmorphism UI: A high-end interface utilizing Tailwind CSS with semi-transparent backdrops, blur effects, and smooth animations.
Secure Authentication: A robust login system to protect the dashboard and user-specific link data.
Real-time Analytics: Tracks total clicks for every shortened link to monitor traffic engagement.
High Performance: Uses the nanoid library for generating collision-resistant, non-sequential IDs.

## Advanced Link Management:

Live Search: Instantly filter recent activity by original URL or short code.
Custom Modals: Elegant confirmation overlays for deleting links, replacing standard browser alerts.

##### Visual Validation: "Shake & Glow" input effects to ensure valid URL entries.

## 🛠️ Technical Stack
## Frontend
React.js (Vite): Component-based architecture for high performance.
Tailwind CSS: Utility-first CSS for the custom Glassmorphism design.
Lucide-React: Modern iconography for intuitive UX.
Axios: For seamless asynchronous communication with the backend.

## Backend
Node.js & Express: Scalable server-side logic.

MongoDB Atlas: NoSQL database for flexible and fast data storage.

Mongoose: Object Data Modeling (ODM) for structured database interactions.

## 🚀 Installation & Setup
Prerequisites
Node.js installed.
A MongoDB Atlas cluster.

## Steps
Clone the Repository:
Bash
git clone https://github.com/aaryamanmodi353-rgb/Mern-Projects.git
cd Mern-Projects
Server Configuration:

Navigate to the server/ directory and install dependencies.

Create a .env file with your credentials:

Plaintext
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/
BASE_URL=http://localhost:5000
Client Configuration:

Navigate to the client/ directory and install dependencies.

Launch the development server: npm run dev.
