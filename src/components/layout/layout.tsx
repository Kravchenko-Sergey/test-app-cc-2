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
					<button>
						<Link to={'/home'}>Home</Link>
					</button>
					<button>
						<Link to={'/settings'}>Settings</Link>
					</button>
				</div>
				{this.props.children}
			</div>
		)
	}
}

export default Layout
