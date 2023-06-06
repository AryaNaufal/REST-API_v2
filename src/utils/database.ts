import { PrismaClient } from "@prisma/client";

class PrismaDatabase {
  private database: PrismaClient;

  public getDB() {
    if(this.database) {
      return this.database
    }
    this.database = new PrismaClient();

    return this.database;
  }
}

export const database = new PrismaDatabase();