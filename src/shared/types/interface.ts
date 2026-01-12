export interface IWords {
	status: 'active' | 'correct' | 'error'
	content: string[]
}

export interface IChecksResult {
	ok: boolean
	isCheckTranslate: boolean
}