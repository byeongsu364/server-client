const express = require("express")
const router = express.Router()

let boards = require('../model/boardModel')

const findeIndexId = (idParam) => {
    return boards.findIndex(b => b.id == Number(idParam))
}

router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: "전체 게시물 가져오기", boards })
    } catch (error) {
        res.status(500).json({ message: "전체 게시물 가져오기 실패", error })
    }
})

router.get("/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.find(b => b.id === boardId)
        if (index === -1) {
            res.status(404).json({ message: "게시글 조회중 오류" })
        }

        res.status(200).json({ message: "게시글1개 조회 완료", board })
    } catch (error) {
        console.error("게시글 조회 중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

router.post('/', (req, res) => {
    try {
        const { title, content } = req.body

        if (!title || !content) {
            return res.status(400).json({ message: '제목과 내용을 모두 입력하세요.' })
        }

        const newBoard = {
            id: Date.now(),
            title,
            content
        }

        boards.push(newBoard)

        res.status(200).json({ message: "게시물 추가 완료", boards })
    } catch (error) {
        res.status(500).json({ message: "게시물 추가 실패", error })
    }
})

router.put('/:id', (req, res) => {
    try {
        const BoardId = Number(req.params.id)

        const index = boards.findIndex(b => b.id == BoardId)


        if (index === -1) {
            return res.status(404).json({ message: "게시글 없음" })
        }
        const updateData = req.body

        boards[index] = {
            ...boards[index],
            ...updateData
        }

        res.status(200).json({ message: "게시물 수정 완료", board : boards[index]})
    } catch (error) {
        res.status(500).json({ message: "게시물 수정 실패", error})
    }
})

router.delete('/:id', (req, res) => {
    try {
        const BoardId = Number(req.params.id)

        const index = boards.findIndex(b => b.id == BoardId)


        if (index === -1) {
            return res.status(404).json({ message: "게시글 없음" })
        }
    
        boards.splice(index,1)

        res.status(200).json({ message: "게시물 수정 완료", boards})
    } catch (error) {
        res.status(500).json({ message: "게시물 수정 실패", error})
    }
})



module.exports = router