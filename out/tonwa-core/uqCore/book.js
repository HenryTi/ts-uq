"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookQueryCaller = exports.Book = exports.UqBook = void 0;
const query_1 = require("./query");
const caller_1 = require("./caller");
class UqBook extends query_1.UqQuery {
    constructor() {
        super(...arguments);
        this.queryApiName = 'book';
    }
    get typeName() { return 'book'; }
    queryCaller(params) {
        return new BookQueryCaller(this, params);
    }
}
exports.UqBook = UqBook;
class Book extends UqBook {
}
exports.Book = Book;
class BookQueryCaller extends caller_1.QueryQueryCaller {
    get path() { return `book/${this.entity.name}`; }
}
exports.BookQueryCaller = BookQueryCaller;
//# sourceMappingURL=book.js.map