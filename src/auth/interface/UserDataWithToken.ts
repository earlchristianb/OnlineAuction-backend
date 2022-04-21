
import { User } from "src/user/entities/user.entity";

export type UserDataWithToken={
    user: User;
    token: string;
}