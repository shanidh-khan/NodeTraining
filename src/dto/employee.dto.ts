import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";
import Address from "../entity/address.entity";
import "reflect-metadata";
import Role from "../utils/role.enum";
import Department from "../entity/department.entity";

class CreateEmployeeDto {
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

	@IsNotEmpty()
	@ValidateNested({ each: true })
	department: Department;
}

class UpdateEmployeeDto {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	@IsEmail()
	email: string;

	@IsOptional()
	@IsNumber()
	age: number;

	@IsOptional()
	@ValidateNested({ each: true })
	address: Address;

	@IsOptional()
	@IsString()
	password: string;

	@IsOptional()
	@IsEnum(Role)
	role: Role;

	@IsOptional()
	@ValidateNested({ each: true })
	department: Department;
}

export { UpdateEmployeeDto, CreateEmployeeDto };
