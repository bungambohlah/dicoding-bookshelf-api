import { IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class CreateBookDto {
  @IsString()
  public name: string;
  @IsNumber()
  public year: number;
  @IsString()
  public author: string;
  @IsString()
  public summary: string;
  @IsString()
  public publisher: string;
  @IsNumber()
  public pageCount: number;
  @IsNumber()
  public readPage: number;
  @IsBoolean()
  public finished: number;
  @IsBoolean()
  public reading: number;
  @IsDate()
  public insertedAt: Date;
  @IsDate()
  public updatedAt: Date;
}
