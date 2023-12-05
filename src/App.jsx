import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./serviceppwrite/auth"
import { login, logout } from "./store/feature/authSlice"

const App = () => {
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()

	useEffect(
		() =>
			authService.getCurrentUser
				.then((userData) => {
					userData ? dispatch(login({ userData })) : dispatch(logout())
				})
				.finally(() => setLoading(false)),
		[],
	)

	return (
		!loading && (
			<div>
				<Header />
				<Footer />
			</div>
		)
	)
}

export default App
