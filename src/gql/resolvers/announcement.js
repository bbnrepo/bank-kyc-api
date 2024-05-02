import { UserInputError } from 'apollo-server-express';
import { get } from 'mongoose';

/**
 * All resolvers related to Nodes
 * @typedef {Object}
 */

export default {
	Query: {
		/**
         * It allows to list all announcements
         */
		listAllAnnouncements:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			return context.di.model.AnnouncementSchema.find().lean();
		},
        
		getAnnouncement:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			return context.di.model.AnnouncementSchema.findOne({ _id: args.id }).lean();
		}

	},

	Mutation: {
		/**
         * It allows to create new announcement
         */
        
		createAnnouncement: async (parent, { input }, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			context.di.authValidation.ensureThatUserIsSuperAdmin(context);

			const isAnnouncementAlreadyRegistered = await context.di.model.AnnouncementSchema.findOne({ title: input.title }).lean();
			if (isAnnouncementAlreadyRegistered) {
				throw new UserInputError('Announcement already exist');
			}

			await new context.di.model.AnnouncementSchema(input).save();
			const announcement = await context.di.model.AnnouncementSchema.findOne({ title: input.title }).lean();

			return announcement;
		},

		/**
         * It allows to update a announcement
         */
		updateAnnouncement: async (parent, { _id, description, status }, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			context.di.authValidation.ensureThatUserIsSuperAdmin(context);
            
			if (!description || !status) {
				throw new UserInputError('Data provided is not valid');
			}

			const isAnnouncementAlreadyCreated = await context.di.model.Announcement.findOne({ _id }).lean();

			if (!isAnnouncementAlreadyCreated) {
				throw new UserInputError('Announcement not found');
			}

			const announcement = await context.di.model.Announcement.findOneAndUpdate({ _id }, { description, status }, { new: true }).lean();

			return announcement;
		},

		/**
         * It allows to delete a announcement
         */
        
		deleteAnnouncement: async (parent, { _id }, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			context.di.authValidation.ensureThatUserIsSuperAdmin(context);

			const isAnnouncementAlreadyCreated = await context.di.model.Announcement.findOne({ _id }).lean();

			if (!isAnnouncementAlreadyCreated) {
				throw new UserInputError('Announcement not found');
			}

			await context.di.model.Announcement.deleteOne({ _id });

			return true;
		}
	}
};



            


