const conn = require("../configs/db");

module.exports = {
  getAllBorrow: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT trx_book.id, user.username, book.title, trx_book.daterent, trx_book.datereturn, trx_book.datereturnuser from trx_book inner join book on trx_book.id_book = book.id INNER JOIN user on trx_book.user_id = user.id`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  getBorrowbyId: (idborrow) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT trx_book.id, user.username, book.title, trx_book.daterent, trx_book.datereturn, trx_book.datereturnuser from trx_book inner join book on trx_book.id_book = book.id INNER JOIN user on trx_book.user_id = user.id where trx_book.id = ?`,
        idborrow,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  getBookId: (idborrow) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * from trx_book where trx_book.id = ?`,
        idborrow,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  getBookStatus: (idbook) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT id_status from book where id = ?`,
        idbook,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  insertBorrow: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `INSERT INTO trx_book SET ?`,
        data,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      )
    })
  },
  updateStatus: (status, idbook) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE book SET id_status = ? WHERE book.id = ?`,
        [status, idbook],
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err));
          }
        }
      )
    })
  },
  updateDate: (date, idborrow) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE trx_book SET datereturnuser = ? WHERE id = ?`,
        [date, idborrow],
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err));
          }
        }
      )
    })
  },
  // addBorrow: (data, idbook, status) => {
  //   return new Promise((resolve, reject) => {
  //     conn.query(
  //       `SELECT id_status from book where id = ?`,
  //       idbook,
  //       (err, res) => {
  //         if (!err) {
  //           const newidbook = res[0].id_status;
  //           if (newidbook == 1) {
  //             conn.query("INSERT INTO trx_book SET ?", data, (err, res) => {
  //               if (!err) {
  //                 conn.query(
  //                   `UPDATE book SET id_status = ? WHERE book.id = ?`,
  //                   [status, idbook],
  //                   (err, res) => {
  //                     if (!err) {
  //                       resolve("Book is Successfully Borrowed");
  //                     } else {
  //                       reject(new Error(err));
  //                     }
  //                   }
  //                 );
  //               } else {
  //                 reject(new Error(err));
  //               }
  //             });
  //           } else {
  //             resolve("This Book is Unavailable")
  //             console.log("Book NOt Available");;
  //           }
  //         } else {
  //           reject(new Error(err));
  //         }
  //       }
  //     );
  //   });
  // },
  // returnBook: (idborrow, datereturn, status) => {
  //   return new Promise((resolve, reject) => {
  //     // console.log(idborrow)
  //     conn.query(
  //       `SELECT id_book from trx_book where id = ?`,
  //       idborrow,
  //       (err, res) => {
  //         // console.log(res[0])

  //         if (!err) {
  //           const idbook = res[0].id_book;
  //           // console.log(idbook.toString())
  //           // resolve(res);
  //           conn.query(
  //             `UPDATE trx_book SET datereturnuser =? where id =?`,
  //             [datereturn, idborrow],
  //             (err, res) => {
  //               if (!err) {
  //                 console.log(idbook);
  //                 conn.query(
  //                   `UPDATE book SET id_status = ? WHERE id = ?`,
  //                   [status, idbook],
  //                   (err, res) => {
  //                     if (!err) {
  //                       resolve("Book is Successfully Returned");
  //                     } else {
  //                       reject(new Error(err));
  //                     }
  //                   }
  //                 );
  //               } else {
  //                 reject(new Error(err));
  //               }
  //             }
  //           );
  //         } else {
  //           resolve("Borrow Id failed")
  //         }
  //       }
  //     );
  //   });
  // }
};