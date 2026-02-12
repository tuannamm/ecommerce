import { keyTokenModel } from '../models/keytoken.model';
import { Types } from 'mongoose';

interface CreateKeyTokenInterface {
  userId: Types.ObjectId;
  publicKey: string;
}

export class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
  }: CreateKeyTokenInterface) => {
    try {
      const token = await keyTokenModel.create({
        users: userId,
        publicKey,
      });
      return token ? publicKey : null;
    } catch (error) {
      console.log('error', error);
    }
  };
}
