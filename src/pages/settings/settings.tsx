import React, { Component } from 'react'
import s from './settings.module.scss'
import { API } from '../../api/api'
import { v4 } from 'uuid'
import Layout from '../../components/layout/layout'
import { Image } from '../home/home'

type SettingsProps = {}

type SettingsState = {
	images: Image[]
	name: string
	description: string
	debounceName: string
	debounceDescription: string
	cover: File | null
	imageUrl: string
	isChangeCover: boolean
	isLoading: boolean
}

class Settings extends Component<SettingsProps, SettingsState> {
	private debounceName: NodeJS.Timeout | null = null
	private debounceDescription: NodeJS.Timeout | null = null
	constructor(props: SettingsState) {
		super(props)
		this.state = {
			images: [],
			name: '',
			description: '',
			debounceName: '',
			debounceDescription: '',
			cover: null,
			imageUrl: '',
			isChangeCover: false,
			isLoading: false
		}
		this.handleName = this.handleName.bind(this)
		this.handleDescription = this.handleDescription.bind(this)
		this.handleChangeCover = this.handleChangeCover.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.handleDeleteAll = this.handleDeleteAll.bind(this)
	}

	componentDidMount() {
		API.getSettings().then(res => {
			this.setState({ ...this.state, name: res.data.name, description: res.data.description })
		})
		API.getAllImages().then(res => {
			this.setState({ images: res.data })
		})
	}

	componentDidUpdate({}, prevState: SettingsState) {
		if (prevState.name !== this.state.name) {
			if (this.debounceName) {
				clearTimeout(this.debounceName)
			}
			this.debounceName = setTimeout(() => {
				API.updateSettings({ name: this.state.name })
			}, 1000)
		}
		if (prevState.description !== this.state.description) {
			if (this.debounceDescription) {
				clearTimeout(this.debounceDescription)
			}
			this.debounceDescription = setTimeout(() => {
				API.updateSettings({ description: this.state.description })
			}, 1000)
		}
	}

	handleName(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ name: e.target.value })
	}

	handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ description: e.target.value })
	}

	handleChangeCover(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			if (file.size < 4000000) {
				const reader = new FileReader()
				reader.onloadend = () => {
					const file64 = reader.result as string
					this.setState({ imageUrl: file64 })
				}
				reader.readAsDataURL(file)
				this.setState({ isChangeCover: true })
				API.getAllImages().then(res => {
					this.setState({ images: res.data })
				})
			} else {
				console.error('Error: ', 'Файл слишком большого размера')
			}
		}
	}

	handleConfirm() {
		this.setState({ isChangeCover: false })
		API.createImage({ id: v4(), url: this.state.imageUrl })
	}

	handleCancel() {
		this.setState({ isChangeCover: false })
	}

	handleDeleteAll = () => {
		this.setState({ isLoading: true })
		this.state.images.forEach((image: Image, index: number) => {
			setTimeout(() => {
				API.deleteImage({ id: image.id })
				if (index === this.state.images.length - 1) {
					API.getAllImages().then(res => {
						this.setState({ images: res.data })
					})
					this.setState({ isLoading: false })
				}
			}, index * 500)
		})
		if (this.state.images.length === 0) {
			this.setState({ isLoading: false })
		}
	}

	render() {
		return (
			<Layout>
				<div className={s.container}>
					<div className={s.card}>
						<input value={this.state.name} onChange={this.handleName} className={s.name} />
						<input value={this.state.description} onChange={this.handleDescription} className={s.description} />
						<label htmlFor='change-cover' className={s.addPhotos}>
							<a>
								<span>
									{this.state.isChangeCover ? (
										<img src={this.state.imageUrl} alt='image' className={s.img} />
									) : this.state.isLoading ? (
										<span className={s.loader}></span>
									) : (
										<div>Drag photos there</div>
									)}
								</span>
							</a>
							<input
								id='change-cover'
								type='file'
								accept='image/*'
								value={''}
								onChange={this.handleChangeCover}
								style={{ display: 'none' }}
							/>
						</label>
						{this.state.isChangeCover && (
							<div className={s.buttons}>
								<button className={s.btn} onClick={this.handleConfirm}>
									Confirm
								</button>
								<button className={s.btn} onClick={this.handleCancel}>
									Cancel
								</button>
							</div>
						)}
						<button onClick={this.handleDeleteAll} className={s.btn} disabled={this.state.isLoading}>
							Delete ALL Photos
						</button>
					</div>
				</div>
			</Layout>
		)
	}
}

export default Settings
