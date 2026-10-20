import { apiKeyModel } from '../models';

export class ApiKeyService {
  static findApiKeyById = async (key: string | undefined) => {
    const apiKey = await apiKeyModel.findOne({ key, status: true }).lean();
    return apiKey;
  };
}
