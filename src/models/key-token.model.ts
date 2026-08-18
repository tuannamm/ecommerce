import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

export const keyTokenSchema = new Schema(
  {
    users: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  },
);

export const keyTokenModel = model(DOCUMENT_NAME, keyTokenSchema);
