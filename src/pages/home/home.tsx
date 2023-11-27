import React, { Component } from 'react'

import s from './home.module.scss'
import { API } from '../../api/api'
import { ArrowLeft, ArrowRight, CloseOutline, EyeOutline, HomeOutline } from '../../assets/icons'
import Layout from '../../components/layout/layout'
import { Link } from 'react-router-dom'

type HomeProps = {}

type HomeState = {
	images: any
	name: string
	description: string
	page: number
	totalCount: number
}

export type Image = {
	id: string
	url: string
}

class Home extends Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props)
		this.state = {
			images: [],
			name: '',
			description: '',
			page: 1,
			totalCount: 0
		}
		this.handlePrevPage = this.handlePrevPage.bind(this)
		this.handleNextPage = this.handleNextPage.bind(this)
	}

	componentDidMount() {
		API.getSettings().then(res => {
			this.setState({ name: res.data.name, description: res.data.description })
		})
		API.getImages({ limit: 9, page: this.state.page }).then(res => {
			this.setState({
				images: res.data,
				totalCount: res.headers['x-total-count']
			})
		})
	}

	componentDidUpdate({}, prevState: HomeState) {
		if (prevState.images.length !== this.state.images.length) {
			API.getImages({ limit: 9, page: this.state.page }).then(res => {
				this.setState({
					images: res.data,
					totalCount: res.headers['x-total-count']
				})
			})
		}
	}

	handleDelete(id: string) {
		API.deleteImage({ id: id }).then(() => {
			this.setState(prevState => ({
				images: prevState.images.filter((image: Image) => {
					return image.id !== id
				})
			}))
		})
	}

	handlePrevPage() {
		const prevPage = this.state.page - 1
		API.getImages({ limit: 9, page: prevPage }).then(res => {
			this.setState({
				images: res.data,
				page: prevPage
			})
		})
	}

	handleNextPage() {
		const nextPage = this.state.page + 1
		API.getImages({ limit: 9, page: nextPage }).then(res => {
			this.setState({
				images: res.data,
				page: nextPage
			})
		})
	}

	render() {
		return (
			<Layout>
				<div className={s.container}>
					<div className={s.card}>
						<div className={s.name}>{this.state.name}</div>
						<div className={s.description}>{this.state.description}</div>
						<div className={s.photos}>
							{this.state.images.length
								? this.state.images.map((image: Image) => (
										<div key={image.id} className={s.photo}>
											<div className={s.inner}>
												<img src={image.url} alt={image.url} className={s.img} />
												<div className={s.title}>
													<span>
														<Link to={`/:${image.id}`}>
															<EyeOutline />
														</Link>
														<CloseOutline onClick={() => this.handleDelete(image.id)} />
													</span>
												</div>
											</div>
										</div>
								  ))
								: null}
							{!this.state.images.length && (
								<div className={s.emptyContainer}>
									<div>You have not added any items yet</div>
									<Link to={'/settings'} className={s.link}>
										<button className={s.btn}>Create</button>
									</Link>
								</div>
							)}
						</div>
						<div className={s.buttons}>
							<button onClick={this.handlePrevPage} className={s.btn} disabled={this.state.page == 1}>
								<ArrowLeft />
							</button>
							<Link to={'/settings'}>
								<button className={s.btn}>
									<HomeOutline />
								</button>
							</Link>
							<button
								onClick={this.handleNextPage}
								className={s.btn}
								disabled={9 * this.state.page >= Number(this.state.totalCount)}
							>
								<ArrowRight />
							</button>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}

export default Home
