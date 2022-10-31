import { hash } from 'bcrypt';
import { PrismaClient, Book } from '@prisma/client';
import { CreateBookDto } from '@/dtos/books.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class BookService {
  public books = new PrismaClient().book;

  public async findAllBook(): Promise<Book[]> {
    const allBook: Book[] = await this.books.findMany();
    return allBook;
  }

  public async findBookById(bookId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(400, 'BookId is empty');

    const findBook: Book = await this.books.findUnique({ where: { id: bookId } });
    if (!findBook) throw new HttpException(409, "Book doesn't exist");

    return findBook;
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const findBook: Book = await this.books.findUnique({ where: { name: bookData.name } });
    if (findBook) throw new HttpException(409, `This book ${bookData.name} already exists`);

    const createBookData: Book = await this.books.create({ data: bookData });
    return createBookData;
  }

  public async updateBook(bookId: string, bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const findBook: Book = await this.books.findUnique({ where: { id: bookId } });
    if (!findBook) throw new HttpException(409, "Book doesn't exist");

    const updateBookData = await this.books.update({ where: { id: bookId }, data: { ...bookData } });
    return updateBookData;
  }

  public async deleteBook(bookId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(400, "Book doesn't existId");

    const findBook: Book = await this.books.findUnique({ where: { id: bookId } });
    if (!findBook) throw new HttpException(409, "Book doesn't exist");

    const deleteBookData = await this.books.delete({ where: { id: bookId } });
    return deleteBookData;
  }
}

export default BookService;
