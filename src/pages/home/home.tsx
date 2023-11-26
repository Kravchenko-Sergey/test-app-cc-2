import React, { Component } from 'react'

import s from './home.module.scss'
import { API } from '../../api/api'
import { ArrowLeft, ArrowRight, CloseOutline, EyeOutline, HomeOutline } from '../../assets/icons'
import Layout from '../../components/layout/layout'
import { Link } from 'react-router-dom'

class Home extends Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			images: [],
			page: 1
		}
		this.handlePrevPage = this.handlePrevPage.bind(this)
		this.handleNextPage = this.handleNextPage.bind(this)
	}

	componentDidMount() {
		API.getImages({ limit: 9, page: this.state.page }).then((res: any) => {
			console.log(res)
			this.setState({
				images: res.data
			})
		})
	}

	componentDidUpdate({}, prevState: any) {}

	handleDelete(id: any) {
		API.deleteImage({ id: id }).then(() => {
			this.setState((prevState: any) => ({
				images: prevState.images.filter((image: any) => image.id !== id)
			}))
		})
	}

	handlePrevPage() {
		const prevPage = this.state.page - 1
		API.getImages({ limit: 9, page: prevPage }).then((res: any) => {
			console.log(res)
			this.setState({
				images: res.data,
				page: prevPage
			})
		})
	}

	handleNextPage() {
		const nextPage = this.state.page + 1
		API.getImages({ limit: 9, page: nextPage }).then((res: any) => {
			console.log(res)
			this.setState({
				images: res.data,
				page: nextPage
			})
		})
	}

	render() {
		console.log(this.state.page)
		return (
			<Layout>
				<div className={s.container}>
					<div className={s.card}>
						<div className={s.name}>dsds</div>
						<div className={s.description}>fgf gdfgfdg gfdg dfg df ggdg</div>
						<div className={s.photos}>
							{this.state.images.map((image: any) => (
								<div key={image.id} className={s.photo}>
									<div className={s.inner}>
										<img src={image.url} alt={image.url} className={s.img} />
										<div className={s.title}>
											<span>
												<Link to={`/home/:${image.id}`}>
													<EyeOutline />
												</Link>
												<CloseOutline onClick={() => this.handleDelete(image.id)} />
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className={s.buttons}>
							<button onClick={this.handlePrevPage} className={s.btn} disabled={this.state.page === 1}>
								<ArrowLeft />
							</button>
							<button className={s.btn}>
								<HomeOutline />
							</button>
							<button onClick={this.handleNextPage} className={s.btn} disabled={this.state.images.length < 9}>
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
