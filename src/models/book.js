const conn = require('../configs/db')
const nameColumns = ['title', 'releasedate', 'genre']

module.exports = {
    //manage book
    getDataAll: (param) => {
        return new Promise((resolve, reject) => {
            const sort = param.sorting
            const available = param.available
            const search = param.search

            console.log(param);
            let basicquery = `SELECT * FROM v_book where 1 `
            if (available != null)
                basicquery += ` AND available = '${available}'`;
            if (search != null)
                basicquery += ` AND title like  '%${search}%' or genre like '%${search}%'`;
            if (sort != null) {
                let [col, order] = sort.split(':')
                // console.log(order)
                if (order === undefined)
                    order = 'asc'
                if (!nameColumns.includes(col)) {
                    resolve('Only can sort Title, Date Release, and Genre')
                    return
                }
                if (order !== 'asc' && order !== 'desc') {
                    resolve('Invalid sort order')
                    return
                }

                basicquery += ` ORDER BY ${col} ${order}`
            }
            basicquery += ` limit ${param.start},${param.limit}  `
            console.log('==' + basicquery)
            conn.query(basicquery, (err, rs) => {
                if (!err) {
                    resolve(rs)
                } else {
                    reject(err)
                }
            })
        })
    },
    // simpleSearch: (param1) => {
    //     return new Promise((resolve, reject) => {
    //         const param = `%${param1}%`
    //         conn.query(`SELECT * from v_book where title like ? or Description like ? or DateReleased like ? or available like ? or genre like ?`, [param, param, param, param, param], (err, rs) => {
    //             if (!err) {
    //                 resolve(rs)
    //             } else {
    //                 reject(err)
    //             }
    //         })
    //     })
    // },
    getData: (idbook) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT book.id, book.Title, book.Description, book.Image, book.DateReleased, status.available, genre.name as genre FROM book inner join genre on book.id_genre = genre.id inner join status on book.id_status = status.id where book.id =?`, idbook, (err, rs) => {
                if (!err) {
                    resolve(rs)
                } else {
                    reject(err)
                }
            })
        })
    },
    addData: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO book SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    editData: (data, idbook) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE book set ? where id = ?`, [data, idbook], (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }

            })
        })
    },
    deleteData: idbook => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM book WHERE id = ?`, idbook, (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    },
    // manage Genre
    getGenre: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM genre', (err, rs) => {
                if (!err) {
                    resolve(rs)
                } else {
                    reject(err)
                }
            })
        })
    },
    getGenreById: (idgenre) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM Genre WHERE id =?`, idgenre, (err, rs) => {
                if (!err) {
                    resolve(rs)
                } else {
                    reject(err)
                }
            })
        })
    },
    addGenre: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO genre SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    editGenre: (data, idgenre) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE genre set ? where id = ?`, [data, idgenre], (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }

            })
        })
    },
    deleteGenre: idgenre => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM genre WHERE id = ?`, idgenre, (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    }
}