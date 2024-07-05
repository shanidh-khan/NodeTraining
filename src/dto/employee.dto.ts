import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsString,
	ValidateNested,
} from "class-validator";
import Address from "../entity/address.entity";
import "reflect-metadata";
import Role from "../utils/role.enum";

export class CreateEmployeeDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsNumber()
	age: number;

	@IsNotEmpty()
	@ValidateNested({ each: true })
	address: Address;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsEnum(Role)
	role: Role;
}
