export type GetSettingsResponse = {
	name: string
	description: string
}

export type UpdateSettingsArgs = {
	name?: string
	description?: string
}

export type GetImagesArgs = {
	limit: number
	page: number
}

export type GetImagesResponse = GetImageResponse[]

export type GetImageArgs = {
	id: string
}

export type CreateImageArgs = {
	id: string
	url: string
}

export type CreateImageResponse = {
	id: string
	url: string
}

export type GetImageResponse = {
	id: string
	url: string
}

export type UpdateSettingsResponse = {
	id: string
}

export type DeleteImageArgs = {
	id: string
}

export type DeleteImageResponse = {}
