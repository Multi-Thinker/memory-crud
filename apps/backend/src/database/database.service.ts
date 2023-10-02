import { Injectable, BadRequestException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UserDto } from '../dto/user.dto';
const sqlite3 = require('sqlite3').verbose();

class User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class DatabaseService {
  private db;

  constructor() {
    this.db = new sqlite3.Database(':memory:');
    this.initializeDatabase();
  }

  resetDatabase() {
    this.db.serialize(() => {
      this.db.run('DELETE FROM users');
    });
  }

  async createDefaultUsers() {
    // inline seed
    const defaultUsers = [
      { username: 'user1', firstName: 'John', lastName: 'Doe' },
      { username: 'user2', firstName: 'Jane', lastName: 'Smith' },
    ];

    for (const userData of defaultUsers) {
      try {
        await this.createUser(userData);
      } catch (error) {
        // Handle errors or duplicates if necessary
        console.error(`Error creating default user: ${error}`);
      }
    }
  }

  private initializeDatabase() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          username TEXT UNIQUE,
          firstName TEXT,
          lastName TEXT
        )
      `);
    });
  }

  async createUser(createUserDto: UserDto): Promise<User> {
    try {
      await validateOrReject(createUserDto);
    } catch (errors) {
      throw new BadRequestException(errors);
    }

    const user = classToPlain(createUserDto) as User;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const stmt = this.db.prepare(
          'INSERT INTO users (username, firstName, lastName) VALUES (?, ?, ?)',
        );
        stmt.run(user.username, user.firstName, user.lastName, function (err) {
          if (err) {
            reject(err);
          } else {
            const insertedId = this.lastID;
            resolve({ id: insertedId, ...user });
          }
        });
        stmt.finalize();
      });
    });
  }

  async readItems(id = ''): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const qry =
          id === ''
            ? `SELECT * FROM users`
            : `SELECT * FROM users WHERE id="${id}"`;
        this.db.all(qry, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    });
  }
  async readItem(id: string): Promise<User[]> {
    return this.readItems(id);
  }

  async updateUser(id: string, updateUserDto: UserDto): Promise<User> {
    try {
      await validateOrReject(updateUserDto);
    } catch (errors) {
      throw new BadRequestException(errors);
    }

    const user = classToPlain(updateUserDto) as User;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
          if (err) {
            reject(err);
          } else if (!row) {
            // user does not exist
            resolve(null);
          } else {
            const stmt = this.db.prepare(
              'UPDATE users SET firstName = ?, lastName = ? WHERE id = ?',
            );
            stmt.run(user.firstName, user.lastName, id, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(user);
              }
            });
            stmt.finalize();
          }
        });
      });
    });
  }

  async deleteUser(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
          if (err) {
            reject(err);
          } else if (!row) {
            resolve(null);
          } else {
            const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
            stmt.run(id, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(row);
              }
            });
            stmt.finalize();
          }
        });
      });
    });
  }
}
