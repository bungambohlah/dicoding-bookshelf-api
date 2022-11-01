import { PrismaClient, Book, Prisma } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { nanoid } from 'nanoid';
import QueryString from 'qs';

class BookService {
  public books = new PrismaClient().book;

  public async findAllBook(query?: Record<string, string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined>): Promise<Book[]> {
    const where: Prisma.BookWhereInput = {};
    if (query) {
      if (typeof query.name === 'string' && !isEmpty(query.name)) where.name = { contains: query.name };
      if (typeof query.reading === 'string' && !isEmpty(query.reading)) where.reading = Boolean(parseInt(query.reading, 10));
      if (typeof query.finished === 'string' && !isEmpty(query.finished)) where.finished = Boolean(parseInt(query.finished, 10));
    }

    const allBook: Book[] = await this.books.findMany({ where });
    return allBook;
  }

  public async findBookById(bookId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(400, 'BookId is empty');

    const findBook: Book | null = await this.books.findFirst({ where: { id: bookId } });
    if (!findBook) throw new HttpException(404, 'Buku tidak ditemukan');

    return findBook;
  }

  public async createBook(bookData: Prisma.BookCreateInput): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');
    if (bookData.readPage > bookData.pageCount)
      throw new HttpException(400, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');

    // generate id with nanoid
    bookData.id = nanoid();
    // finished is pageCount equal with readPage
    bookData.finished = bookData.pageCount === bookData.readPage;

    const createBookData: Book = await this.books.create({ data: bookData });
    return createBookData;
  }

  public async updateBook(bookId: string, bookData: Prisma.BookUpdateInput): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');
    if (typeof bookData.readPage === 'number' && typeof bookData.pageCount === 'number' && bookData.readPage > bookData.pageCount)
      throw new HttpException(400, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');

    const findBook: Book | null = await this.books.findFirst({ where: { id: bookId } });
    if (!findBook) throw new HttpException(404, 'Gagal memperbarui buku. Id tidak ditemukan');

    const updateBookData = await this.books.update({ where: { id: bookId }, data: { ...bookData, updatedAt: new Date() } });
    return updateBookData;
  }

  public async deleteBook(bookId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(404, 'Buku gagal dihapus. Id tidak ditemukan');

    const findBook: Book | null = await this.books.findFirst({ where: { id: bookId } });
    if (!findBook) throw new HttpException(404, 'Buku gagal dihapus. Id tidak ditemukan');

    const deleteBookData = await this.books.delete({ where: { id: bookId } });
    return deleteBookData;
  }
}

export default BookService;
