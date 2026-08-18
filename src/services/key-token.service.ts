import { keyTokenModel } from '../models/key-token.model';
import { Types } from 'mongoose';

interface CreateKeyTokenInterface {
  userId: Types.ObjectId;
  publicKey: string;
  privateKey: string;
}

export class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
  }: CreateKeyTokenInterface) => {
    try {
      const token = await keyTokenModel.create({
        users: userId,
        publicKey,
        privateKey,
      });
      return token ? token.publicKey : null;
    } catch (error) {
      console.log('error', error);
    }
  };
}
