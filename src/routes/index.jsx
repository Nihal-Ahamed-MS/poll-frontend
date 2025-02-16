import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from '../pages/Authentication/SignUp'
import PollList from '../pages/Poll'
import SignIn from '../pages/Authentication/SignIn'
import AddPoll from '../pages/Poll/AddPoll'
import EachPoll from '../pages/Poll/EachPoll'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/" element={<PollList />} />
                <Route path="/poll" element={<AddPoll />} />
                <Route path="/poll/:pollId" element={<EachPoll />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes