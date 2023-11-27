import React, { Component, ReactNode } from 'react'
import s from './layout.module.scss'
import { Link } from 'react-router-dom'

type LayoutProps = {
	children: ReactNode
}

class Layout extends Component<LayoutProps> {
	render() {
		return (
			<div className={s.container}>
				<div className={s.buttons}>
					<Link to={'/home'} className={s.link}>
						<button className={s.btn}>Home</button>
					</Link>
					<Link to={'/settings'} className={s.link}>
						<button className={s.btn}>Settings</button>
					</Link>
				</div>
				{this.props.children}
			</div>
		)
	}
}

export default Layout
