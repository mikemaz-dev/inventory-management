class PublicPages {
	HOME = '/'
	DASHBOARD = '/dashboard'
	INVENTORY_PAGE = `${this.DASHBOARD}/inventory/`

	AUTH = '/auth'
	LOGIN = `${this.AUTH}/login`
	REGISTER = `${this.AUTH}/register`
}

export const PUBLIC_PAGES = new PublicPages()
