import { registerAs } from '@nestjs/config';

export default registerAs('rivalsApi', () => ({
  rivals_key: process.env.RIVALS_KEY,
}));
