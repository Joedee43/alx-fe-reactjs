import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import Header from './components/Header'
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from './components/UserProfile';
function App() {


  return (
    <>
      <WelcomeMessage /> 
      <Header />
      <Footer />
      <MainContent />
      <h1>User Profiles</h1>
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <UserProfile name="Bob" age="30" bio="An avid traveler and foodie" />
    </>
  )
}

export default App
