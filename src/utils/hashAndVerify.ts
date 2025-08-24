import bcrypt from 'bcrypt';

export const hashString = async (value: any) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(value, saltRounds);
  // const hash = await argon.hash(value); //hash password
  return hashedPassword;
};

export const verifyHashString = async (existingValue: string, value: any) => {
  const hash = await bcrypt.compare(value, existingValue);
  // const hash = await argon.verify(existingValue, value);
  return hash;
};
