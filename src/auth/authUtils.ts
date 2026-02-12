import { KeyObject } from 'crypto';
import jwt from 'jsonwebtoken';

interface CreateTokenPairInterface {
  payload: any;
  publicKey: string | KeyObject;
  privateKey: string | KeyObject;
}

export const createTokenPair = async ({
  payload,
  publicKey,
  privateKey,
}: CreateTokenPairInterface) => {
  try {
    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days',
    });

    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7 days',
    });

    return { accessToken, refreshToken };
  } catch (error) {}
};
