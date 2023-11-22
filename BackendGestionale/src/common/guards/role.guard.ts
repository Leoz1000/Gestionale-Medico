/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: string[]) => {
  return SetMetadata('role', args);
};
