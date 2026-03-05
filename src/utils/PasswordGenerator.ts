export const PasswordGenerator = () => {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "@$!%*?&";

  const all = lower + upper + numbers + special;

  const getRandom = (str: string) =>
    str[Math.floor(Math.random() * str.length)];

  // Ensure at least one of each
  let password =
    getRandom(lower) +
    getRandom(upper) +
    getRandom(numbers) +
    getRandom(special);

  // Fill remaining length (8+)
  for (let i = password.length; i < 12; i++) {
    password += getRandom(all);
  }

  // Shuffle to avoid predictable pattern
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};