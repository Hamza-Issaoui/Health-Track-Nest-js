import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  readonly description: string;

  @IsString()
  @MinLength(6)
  readonly title: string;

  @IsString()
  @IsIn(['info', 'warning', 'alert'])
  readonly type: string;

  @IsBoolean()
  readonly read: boolean;

  @IsString()
  @IsIn(['low', 'medium', 'high'])
  readonly priority: string;
}
