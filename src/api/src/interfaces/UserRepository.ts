import { UserData } from "@shared/types";

export interface IUserRepository {
    getFromEmail(email: string): Promise<UserData | undefined>;
    getFromId(id: number): Promise<UserData | undefined>;
    add(email: string,password: string,name: string): Promise<string>;
}