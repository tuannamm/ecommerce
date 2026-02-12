import mongoose from 'mongoose';
import { countConnection } from '../helpers/check-connect';

class Database {
  private static instance: Database;

  constructor() {
    this.connect();
  }

  connect() {
    if (1 == 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect('mongodb://root:example@localhost:27017')
      .then(() => console.log(`Connected to MongoDB: ${countConnection()}`))
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
export default instanceMongodb;
