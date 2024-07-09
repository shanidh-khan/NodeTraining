import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import Role from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity {
	@Column({ unique: true })
	email: string;

	@Column()
	name: string;

	@Column()
	age: Number;

	@OneToOne(() => Address, (address) => address.employee, {
		cascade: true,
		onDelete: "CASCADE",
	})
	address: Address;

	@Column({ nullable: true })
	password: string;

	@Column({ nullable: true })
	role: Role;

	@ManyToOne(() => Department, (department) => department.id, {
		cascade: ["insert", "update"],
	})
	department: Department;
}

export default Employee;
