import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export default registerAs('rivalsApi', () => {
  const rivalsKey = process.env.RIVALS_KEY;

  if (!rivalsKey) {
    new Logger('RivalsConfig').warn(
      'RIVALS_KEY environment variable is missing',
    );
  }
  return {
    rivals_key: rivalsKey,
  };
});
