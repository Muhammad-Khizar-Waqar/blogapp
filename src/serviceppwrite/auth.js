import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite"

export class AuthService {
	client = new Client()
	account

	constructor() {
		this.client
        .setEndpoint(conf.appwriteEndpoint)
        .setProject(conf.appwriteProjectId)
		this.account = new Account(this.client)
	}

	async createAccount({ name, email, password }) {
		try {
			const userAccount = await this.account.create(ID.unique(), name, email, password)
			if (userAccount) {
				return this.login({ email, password })
			} else {
				return userAccount
			}
		} catch (error) {
			throw error
		}
	}

	async login(email, password) {
		try {
			return this.account.createEmailSession(email, password)
		} catch (error) {
			throw error
		}
	}

	async currentUser() {
		try {
			return await this.account.get()
		} catch (error) {
			throw error
		}
	}

	async logout() {
		try {
			await this.account.deleteSessions()
		} catch (error) {
			throw error
		}
	}
}

const authService = new AuthService()

export default authService
