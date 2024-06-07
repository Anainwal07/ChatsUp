import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import MessageContainer from './components/messages/MessageContainer'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'

function App() {
  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        {/* <Login/> */}
        {/* <SignUp/> */}
        {/* <Sidebar/> */}
        <MessageContainer/>
      </div>
    </>
  )
}

export default App
