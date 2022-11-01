import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Gagal menambahkan buku. Mohon isi nama buku' })
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
  @IsOptional()
  public finished: boolean;
  @IsBoolean()
  public reading: boolean;
  @IsDateString()
  @IsOptional()
  public insertedAt: string;
  @IsDateString()
  @IsOptional()
  public updatedAt: string;
}

export class UpdateBookDto {
  @IsString({ message: 'Gagal memperbarui buku. Mohon isi nama buku' })
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
  @IsOptional()
  public finished: boolean;
  @IsBoolean()
  public reading: boolean;
  @IsDateString()
  @IsOptional()
  public insertedAt: string;
  @IsDateString()
  @IsOptional()
  public updatedAt: string;
}
