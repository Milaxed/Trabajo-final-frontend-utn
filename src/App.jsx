import "./global.css"
import { Route, Routes } from "react-router"
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import NotFoundScreen from "./Screens/NotFoundScreen/NotFoundScreen";
import ContactDetailScreen from "./Screens/ContactDetailScreen/ContactDetailScreen";
import { ContactContextProvider } from "./Context/ContactContext"

export default function App() {
	return (
		<Routes>
			<Route path='/login' element={<LoginScreen />} />

			<Route element={<ContactContextProvider />}>
				<Route
					path='/'
					element={<HomeScreen />}
				/>
				<Route
					path='/home'
					element={<HomeScreen />}
				/>
				<Route
					path='/contact/:contact_id'
					element={<ContactDetailScreen />}
				/>
			</Route>

			<Route path='*' element={<NotFoundScreen />} />
		</Routes>
	)
}
