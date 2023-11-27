import React, { Component, ReactNode } from 'react'
import s from './layout.module.scss'
import { NavLink } from 'react-router-dom'

type LayoutProps = {
	children: ReactNode
}

class Layout extends Component<LayoutProps> {
	render() {
		return (
			<div className={s.container}>
				<div className={s.buttons}>
					<NavLink to={'/'} className={({ isActive }) => (isActive ? s.activeLink : s.link)}>
						<button className={s.btn}>Home</button>
					</NavLink>
					<NavLink to={'/settings'} className={({ isActive }) => (isActive ? s.activeLink : s.link)}>
						<button className={s.btn}>Settings</button>
					</NavLink>
				</div>
				{this.props.children}
			</div>
		)
	}
}

export default Layout
