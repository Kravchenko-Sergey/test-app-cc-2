import React, { Component } from 'react'
import s from './settings.module.scss'
import { API } from '../../api/api'
import { v4 } from 'uuid'
import Layout from '../../components/layout/layout'

interface SettingsState {
	name: string
	description: string
	debounceName: any
	debounceDescription: any
	cover: File
	imageUrl: string
}

class Settings extends Component<any, any> {
	private debounceName: NodeJS.Timeout | null = null
	private debounceDescription: NodeJS.Timeout | null = null
	constructor(props: SettingsState) {
		super(props)
		this.state = {
			name: '',
			description: '',
			debounceName: '',
			debounceDescription: '',
			cover: null,
			imageUrl: ''
		}
		this.handleName = this.handleName.bind(this)
		this.handleDescription = this.handleDescription.bind(this)
		this.handleChangeCover = this.handleChangeCover.bind(this)
	}

	componentDidMount() {
		API.getName().then((res: any) => {
			this.setState({ ...this.state, name: res.data.name })
		})
		API.getDescription().then((res: any) => {
			this.setState({ ...this.state, description: res.data.description })
		})
	}

	componentDidUpdate({}, prevState: any) {
		if (prevState.name !== this.state.name) {
			if (this.debounceName) {
				clearTimeout(this.debounceName)
			}
			this.debounceName = setTimeout(() => {
				API.updateName({ name: this.state.name })
			}, 1000)
		}
		if (prevState.description !== this.state.description) {
			if (this.debounceDescription) {
				clearTimeout(this.debounceDescription)
			}
			this.debounceDescription = setTimeout(() => {
				API.updateDescription({ description: this.state.description })
			}, 1000)
		}
	}

	handleName(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ name: e.target.value })
	}

	handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ description: e.target.value })
	}

	handleChangeCover(e: any) {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			if (file.size < 4000000) {
				const reader = new FileReader()
				reader.onloadend = () => {
					const file64 = reader.result as string
					this.setState({ imageUrl: file64 })
					API.createImage({ id: v4(), url: file64 })
				}
				reader.readAsDataURL(file)
			} else {
				console.error('Error: ', 'Файл слишком большого размера')
			}
		}
	}

	nandleDeleteAll() {
		API.deleteAllImages()
	}

	render() {
		console.log(this.state)
		return (
			<Layout>
				<div className={s.container}>
					<div className={s.card}>
						<input value={this.state.name} onChange={this.handleName} className={s.name} />
						<input value={this.state.description} onChange={this.handleDescription} className={s.description} />
						<label htmlFor='change-cover' className={s.addPhotos}>
							<a>
								<span>
									{this.state.imageUrl.length > 0 ? (
										<div>
											<img src={this.state.imageUrl} alt='image' className={s.img} />
										</div>
									) : (
										<div>Drag photos there</div>
									)}
								</span>
							</a>
							<input
								id='change-cover'
								type='file'
								accept='image/*'
								onChange={this.handleChangeCover}
								style={{ display: 'none' }}
							/>
						</label>
						<button onClick={this.nandleDeleteAll} className={s.btn}>
							Delete ALL Photos
						</button>
					</div>
				</div>
			</Layout>
		)
	}
}

export default Settings
