import axios from 'axios'

export const instance = axios.create({
	baseURL: 'http://localhost:8000/'
})

export const API = {
	getName() {
		return instance.get<any>('settings')
	},
	updateName(arg: any) {
		return instance.patch<any>('settings', arg)
	},
	getDescription() {
		return instance.get<any>('settings')
	},
	updateDescription(arg: any) {
		return instance.patch<any>('settings', arg)
	},
	getImages(arg: any) {
		return instance.get<any>(`images?_limit=${arg.limit}&_page=${arg.page}`)
	},
	getImage(arg: any) {
		return instance.get<any>(`images/${arg.id}`)
	},
	createImage(arg: any) {
		return instance.post<any>('images', arg)
	},
	deleteImage(arg: any) {
		return instance.delete<any>(`images/${arg.id}`)
	},
	deleteAllImages() {
		return instance.delete<any>(`images`)
	}
}
