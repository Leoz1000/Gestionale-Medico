import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findAll(): Promise<UserDocument[]>;
    findAllDoctor(): Promise<UserDocument[]>;
    findById(id: string): Promise<UserDocument>;
    findByUsername(username: string): Promise<UserDocument>;
    updateRefreshToken(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument>;
    hashData(data: string): Promise<string>;
    remove(id: string): Promise<UserDocument>;
}
