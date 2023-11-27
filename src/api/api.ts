import axios from 'axios'
import {
	CreateImageArgs,
	CreateImageResponse,
	DeleteImageArgs,
	GetImageArgs,
	GetImageResponse,
	GetImagesArgs,
	GetImagesResponse,
	GetSettingsResponse,
	UpdateSettingsArgs,
	UpdateSettingsResponse,
	DeleteImageResponse
} from './types'

export const instance = axios.create({
	baseURL: 'http://localhost:8000/'
})

export const API = {
	getSettings() {
		return instance.get<GetSettingsResponse>('settings')
	},
	updateSettings(arg: UpdateSettingsArgs) {
		return instance.patch<UpdateSettingsResponse>('settings', arg)
	},
	getImages(arg: GetImagesArgs) {
		return instance.get<GetImagesResponse>(`images?_limit=${arg.limit}&_page=${arg.page}`)
	},
	getAllImages() {
		return instance.get<GetImagesResponse>(`images`)
	},
	getImage(arg: GetImageArgs) {
		return instance.get<GetImageResponse>(`images/${arg.id}`)
	},
	createImage(arg: CreateImageArgs) {
		return instance.post<CreateImageResponse>('images', arg)
	},
	deleteImage(arg: DeleteImageArgs) {
		return instance.delete<DeleteImageResponse>(`images/${arg.id}`)
	}
}
