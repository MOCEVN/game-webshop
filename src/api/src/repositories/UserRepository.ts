import { UserData } from "@shared/types";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { getConnection, queryDatabase } from "../databaseService";
import { IUserRepository } from "../interfaces/UserRepository";

export class UserRepository implements IUserRepository {
    /**
     * Gets user data from an email address.
     * @param email 
     * @returns UserData
     */
    public async getFromEmail(email: string): Promise<UserData | undefined> {
        const connection: PoolConnection = await getConnection();
        const user: any = await queryDatabase(connection,"SELECT id, email, password, name, firstName, lastName, authorizationLevel FROM user WHERE email = ?",email);
        connection.release();
        return user[0] as UserData | undefined;
    }
    /**
     * Gets user data from an id.
     * @param id 
     * @returns UserData
     */
    public async getFromId(id: number): Promise<UserData | undefined> {
        const connection: PoolConnection = await getConnection();
        const user: any = await queryDatabase(connection,"SELECT id, email, password, name, firstName, lastName, authorizationLevel FROM user WHERE id = ?",id);
        connection.release();
        return user[0] as UserData | undefined;
    }
    /**
     * Adds a user to the database.
     * @param email 
     * @param password 
     * @param name 
     * @returns Error string. Empty if no error.
     */
    public async add(email: string,password: string,name: string,firstName: string, lastName: string): Promise<string> {
        const connection: PoolConnection = await getConnection();
        const query: string = "INSERT INTO `user`(`email`, `password`, `name`, `firstName`, `lastName`) VALUES (?,?,?,?,?)";
        const values: string[] = [email,password,name,firstName,lastName];
        try {
            await connection.beginTransaction();
            const queryResult: ResultSetHeader = await queryDatabase(connection, query, ...values);
            await connection.commit();
            if (queryResult.affectedRows > 0) {
                return "";
            }
            return queryResult.info;
        } catch (err) {
            console.error(err);
            return err as string;
        } finally {
            connection.release();
        }
    }
}
