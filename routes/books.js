const express = require("express");
const router = express.Router();


let books = [
    { id: 1, title: "javascript", author: "김**" },
    { id: 2, title: "html", author: "김**" },
    { id: 3, title: "css", author: "김**" },
];

const findeIndexId = (idParam) => {
    return books.findIndex(b => b.id == Number(idParam))
}

router.post('/', (req, res) => {
    try {
        const { title, author } = req.body

        if (typeof title !== 'string' || title.trim() == '' ||
            typeof author !== 'string' || author.trim() == '') {
            return res.status(400).json({message: "title, author는 비워있지 않은 문자열 이어야 합니다." })
        }

        const nextId = books.length? Math.max(...books.map(b=>b.id))+1:1

        const newBook = {
            id: nextId,
            title: title,
            author: author
        }

        books.push(newBook)
        res.status(201).json({
            message: "도서 추가 완료",
            books
        })
    } catch (error) {
        console.error("도서 추가중 오류", error)
        res.status(500).json({message: "서버오류" })
    }
})

router.get('/', (req, res) => {
    try {
        res.status(200).json({message: "전체도서 가져오기", books})
    } catch (error) {
        console.error("전체 도서 가져오기 중 오류")
        res.status(500).json({message: "서버오류" })
    }
})

router.get('/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = findeIndexId(bookId)

        if (index == -1) {return res.status(404).json({message: "도서 없음" })}
        res.status(200).json({message: "도서 한권 가져오기", book : books[index]})
    } catch (error) {
        console.error("도서 한권 가져오기 중 오류")
        res.status(500).json({message: "서버오류" })
    }
})

router.put('/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = findeIndexId(bookId)

        if (index == -1) return res.status(404).json({message: "도서 없음" })

        const updateData = req.body

        books[index] = {
            ...books[index],
            ...updateData
        }

        res.status(200).json({message: "도서 한권 수정하기 완료", book : books[index]})
    } catch (error) {
        console.error("도서 한권 수정하기 중 오류")
        res.status(500).json({message: "서버오류" })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = findeIndexId(bookId)

        if (index == -1) return res.status(404).json({message: "도서 없음" })

        books.splice(index,1)

        res.status(200).json({message: "도서 한권 삭제하기 완료", books})
    } catch (error) {
        console.error("도서 한권 삭제하기 중 오류")
        res.status(500).json({message: "서버오류" })
    }
})

router.patch('/:id/title', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = findeIndexId(bookId)

        if (index == -1) return res.status(404).json({message: "도서 없음" })

        const { title } = req.body

        

        books[index] = {
            ...books[index],
            title
        }

        res.status(200).json({message: "도서 한권 제목변경 완료", book : books[index]})
    } catch (error) {
        console.error("도서 한권 제목변경 중 오류")
        res.status(500).json({message: "서버오류" })
    }
})

module.exports = router

// 