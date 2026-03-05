export type Session = {
  id: string;
  device: "windows" | "iphone" | "mac";
  title: string;
  browser: string;
  os: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
};