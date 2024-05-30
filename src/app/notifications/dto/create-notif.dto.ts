import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  readonly message: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly title?: string;

  @IsString()
  @IsOptional()
  @IsIn(['info', 'warning', 'alert'])
  readonly type?: string;

  @IsBoolean()
  @IsOptional()
  readonly read?: boolean;

  @IsString()
  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  readonly priority?: string;
}
