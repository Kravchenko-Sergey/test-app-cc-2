import React, { Component, ComponentType } from 'react'

import s from './photo.module.scss'
import Layout from '../../components/layout/layout'
import { API } from '../../api/api'
import { useParams } from 'react-router-dom'

type Props = {
	params: {
		id: string
	}
}

type State = {
	imageUrl: string
}

type RouteParams = {
	id: string
}

function withParams(Component: ComponentType<{ params: RouteParams }>) {
	return (props: any) => <Component {...props} params={useParams()} />
}

class Photo extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			imageUrl: ''
		}
	}

	componentDidMount() {
		const { id } = this.props.params

		API.getImage({ id: id.slice(1) }).then(res => {
			this.setState({ imageUrl: res.data.url })
		})
	}

	render() {
		return (
			<Layout>
				<div className={s.container}>
					<img src={this.state.imageUrl} alt='image' className={s.img} />
				</div>
			</Layout>
		)
	}
}

export default withParams(Photo)
