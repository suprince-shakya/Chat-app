import * as bcrypt from 'bcryptjs';

export const hashPassword = (plainPassword: string) => {
	return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));
};

export const comparePassword = (plainPassword: string, hashPassword: string) => {
	return bcrypt.compareSync(plainPassword, hashPassword);
};
