import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Settings from './pages/settings/settings'
import Photo from './pages/item/item'

export const MyContext = React.createContext({})

type AppState = {
	name: string
	description: string
}

class App extends Component<{}, AppState> {
	constructor(props: {}) {
		super(props)
		this.state = {
			name: '',
			description: ''
		}
	}

	updateContextName(newValue: string) {
		this.setState({ name: newValue })
	}

	updateContextDescription(newValue: string) {
		this.setState({ description: newValue })
	}

	render() {
		const value = {
			name: this.state.name,
			description: this.state.description,
			updateContextName: this.updateContextName,
			updateContextDescription: this.updateContextDescription
		}

		return (
			<MyContext.Provider value={value}>
				<Routes>
					<Route path={'/home'} element={<Home />}></Route>
					<Route path={'/home/:id'} element={<Photo />}></Route>
					<Route path={'/settings'} element={<Settings />}></Route>
				</Routes>
			</MyContext.Provider>
		)
	}
}

export default App
