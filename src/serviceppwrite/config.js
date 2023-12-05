import conf from "../conf/conf"
import { Client, Databases, Storage, Query, ID } from "appwrite"

export class Servies {
	client = new Client()
	databases
	storage

	constructor() {
		this.client.setEndpoint(conf.appwriteEndpoint).setProject(conf.appwriteProjectId)
		this.databases = new Databases(this.Client)
		this.storage = new Storage(this.Client)
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					status,
					userId,
					featuredImage,
				},
			)
		} catch (error) {
			console.log("App write services :: CreatePost :: error: ", error)
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				},
			)
		} catch (error) {
			console.log("App write services :: UpdatePost :: error: ", error)
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
			return true
		} catch (error) {
			console.log("App write services :: Delete Post :: error: ", error)
			return false
		}
	}

	async getPost(slug) {
		try {
			return this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
		} catch (error) {
			console.log("App write services :: Single Post :: error: ", error)
			return false
		}
	}

	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return this.databases.listDocuments(
				this.appwriteDatabaseId,
				this.appwriteCollectionId,
				queries,
			)
		} catch (error) {
			console.log("App write services :: List Posts :: error: ", error)
			return false
		}
	}
	//Create a new File Image

	async uploadFile(file) {
		try {
			await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file)
			return true
		} catch (error) {
			console.log("App write services :: file upload :: error: ", error)
			return false
		}
	}

	async deleteFile(fileId) {
		try {
			return await this.storage.deleteFile(conf.appwriteBucketId, fileId)
		} catch (error) {
			console.log("App write services :: Delete File :: error: ", error)
			return false
		}
	}

	getFilePreview(fileId) {
		this.storage.getFilePreview(conf.appwriteBucketId, fileId)
	}
}

const service = new Servies()
export default service
