class PAGES {
	DASHBOARD = '/dashboard'
	INVENTORY_PAGE = `${this.DASHBOARD}/inventory/`

	AUTH = '/auth'
	LOGIN = `${this.AUTH}/login`
	REGISTER = `${this.AUTH}/register`
	ADMIN = '/admin'
}

export const PUBLIC_PAGES = new PAGES()
