import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").UserDocument>;
    findAllDoctor(): Promise<{
        _id: any;
        name: string;
    }[]>;
    findAll(Body: any): Promise<[{
        _id: any;
        name: string;
        username: string;
        role: string;
        email: string;
        phone: string;
    }]>;
    findById(id: string): Promise<import("./schemas/user.schema").UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schemas/user.schema").UserDocument>;
    remove(id: string, role: string): Promise<any>;
}
