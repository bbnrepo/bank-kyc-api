import { UserInputError } from 'apollo-server-express'

/**
 * All resolvers related to users
 * @typedef {Object}
 */
export default {
	Query: {
		listAllUsers: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context)

			// context.di.authValidation.ensureThatUserIsSuperAdmin(context)

			const sortCriteria = {
				isAdmin: 'desc',
				registrationDate: 'asc'
			}
			const user = await context.di.model.Users
				.find()
				.skip((args.pageNumber - 1) * args.pageSize)
				.limit(args.pageSize)
				.populate({
					path: 'userRole',
					select: 'name _id'
				})
			return user
		},

		listAllAdminUsers: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context)

			context.di.authValidation.ensureThatUserIsSuperAdmin(context)
			const roleNames = [
				'super-admin',
				'recruiter',
				'maintainer',
				'partner-admin',
				'world-admin'
			]

			const user = await context.di.model.Users
				.aggregate([
					{
						$lookup: {
							from: 'userroles', // Collection name of the referenced data (case-sensitive)
							localField: 'userRole',
							foreignField: '_id',
							as: 'userRole'
						}
					},
					{
						$match: {
							'userRole.name': { $in: roleNames }
						}
					},
					{
						$addFields: {
							userRole: { $arrayElemAt: ['$userRole', 0] } // Extract the first role from roleData
						}
					}
				])
				.exec()

			return user
		},

		getUser: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context)
			const user = await context.di.model.Users
				.findById(context.user._id)
				.populate({
					path: 'userRole',
					select: 'name _id',
					populate: {
						path: 'abilities',
						model: 'abilities'
					}
				})
				.lean()
			return user
			// return context.di.model.Users.findOne({ _id: args.id }).lean();
		},
		getCurrentUser: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context)
			const user = await context.di.model.Users
				.findById(context.user._id)
				.populate({
					path: 'userRole',
					select: 'name _id'
				})
				.lean()
			return user
			// return context.di.model.Users.findOne({ _id: args.id }).lean();
		}
	},
	Mutation: {
		updateUser: async (parent, args, context) => {
			const { _id, input } = args
			if (!_id) {
				throw new UserInputError('Data provided is not valid')
			}
			context.di.authValidation.ensureThatUserIsLogged(context)
			context.di.authValidation.ensureUserRole(context, [
				'super-admin',
				'world-admin'
			])

			const isExist = await context.di.model.Users
				.findById(_id)
				.lean()

			if (!isExist) {
				throw new UserInputError('User Not Exist')
			}

			const user = await context.di.model.Users
				.findOneAndUpdate({ _id }, input)
				.lean()

			return user
		}
	}
}
