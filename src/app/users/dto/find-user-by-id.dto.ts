// find-user-by-id.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class FindUserByIdDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
