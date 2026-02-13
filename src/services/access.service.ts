import bcrypt from 'bcrypt-ts';
import crypto from 'crypto';

import { shopModel } from '../models';
import { KeyTokenService } from './keyToken.service';
import { createTokenPair } from '../auth/authUtils';
import { getInfoData } from '../utils';

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

export interface ISignup {
  name: string;
  email: string;
  password: string;
}

export class AccessService {
  static signup = async ({ name, email, password }: ISignup) => {
    try {
      const holderShop = await shopModel.findOne({
        name,
        email,
        password,
        roles: [RoleShop.SHOP],
      });

      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already exists',
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
      });

      if (newShop) {
        // create privateKey and publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        });

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey: publicKey.toString(),
        });

        if (!publicKeyString) {
          return {
            code: 'xxx',
            message: 'Create public key error',
          };
        }

        // create token pair
        const tokens = await createTokenPair({
          payload: {
            userId: newShop._id,
            email,
          },
          publicKey,
          privateKey,
        });

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ['_id', 'name', 'email'],
              object: newShop,
            }),
            tokens,
          },
        };
      }
    } catch (error) {
      return {
        code: 'xxxx',
        message: 'Shop created failed',
      };
    }
  };
}
