# Startup Idea Evaluator

This is a **React Native + Expo** mobile app that allows users to submit startup ideas, get an AI-generated rating & feedback, and vote for the best ideas.  
It was built as a learning project to explore **React Native, Expo, navigation, and local storage**.
##  Features
- Submit startup ideas with title, tagline, and description
- Automatic **AI rating (random score generator for demo)**
- Instant feedback messages based on rating
- View all ideas in a clean list
- Sort ideas by **Rating, Votes, or Newest**
- Vote once per idea (stored locally with AsyncStorage)
- Leaderboard of top-voted ideas
- Dark / Light theme toggle
- Share ideas with friends
- Simple and minimal UI

##  Tech Stack
- [Expo](https://docs.expo.dev/) – to run and build the app easily
- [React Native](https://reactnative.dev/) – core framework
- [React Navigation](https://reactnavigation.org/) – for tabs and stack navigation
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – save ideas & votes locally
- [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) – vibration feedback on voting
- [Toast](https://github.com/calintamas/react-native-toast-message) – notifications & messages

---

##  Installation & Setup
1. Clone or download this project:
   git clone https://github.com/your-username/startup-idea-evaluator.git
   cd VentureVote
2. Install dependencies:
   npm install
3. Run the app:

   npx expo start
   * Use **Expo Go** app on Android/iOS to scan the QR code.
## 📂 Project Structure

VentureVote/
│-- App.js                 # Main entry
│-- app.json               # Expo config
│-- assets/                # App icons, splash
│-- contexts/              # Theme + Idea context
│-- screens/               # Idea submission, listing, leaderboard
│-- package.json           # Dependencies
│-- README.md              # Project documentation

## 📖 Learning References

* Expo Docs → [https://docs.expo.dev/](https://docs.expo.dev/)
* React Native Docs → [https://reactnative.dev/](https://reactnative.dev/)
* React Navigation → [https://reactnavigation.org/docs/getting-started/](https://reactnavigation.org/docs/getting-started/)
* AsyncStorage → [https://react-native-async-storage.github.io/async-storage/docs/usage](https://react-native-async-storage.github.io/async-storage/docs/usage)
* YouTube Crash Course → [https://youtu.be/ZBCUegTZF7M](https://youtu.be/ZBCUegTZF7M)

## Student Notes

This project is **for learning purposes only**.
The "AI rating" is just a random score generator and **not an actual AI model**.

## Author

Created by
 RAMAVATH VENKATESH NAIK
B.Tech (ECE), JNTU Anantapur – 2024

 

Do you want me to also make a **shorter version (1-page README)** that looks like a casual student project instead of this detailed one?
```
