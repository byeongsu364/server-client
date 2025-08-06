const express = require("express")
const router = express.Router()

let char = require('../models/characterModel')

const findIndexId = (idParam) => {
    return char.findIndex(c => c.id == Number(idParam))
}

router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: "전체 게시물 가져오기", char })
    } catch (error) {
        res.status(500).json({ message: "전체 게시물 가져오기 실패", error })
    }
})

router.get("/:id", (req, res) => {
    try {
        const charId = Number(req.params.id)
        const index = findIndexId(charId)
        if (index === -1) {
            return res.status(404).json({ message: "게시글 조회중 오류" })
        }

        res.status(200).json({ message: "게시글1개 조회 완료", character : char[index] })
    } catch (error) {
        console.error("게시글 조회 중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

router.post('/', (req, res) => {
    try {
        const { name, level, isOnline } = req.body

        if (!name || !level) {
            return res.status(400).json({ message: '이름과 레벨을 모두 입력하세요.' })
        }

        const newChar = {
            id: Date.now(),
            name,
            level,
            isOnline: isOnline ?? false //빈값인 경우는 null일때   false
        }

        char.push(newChar)

        res.status(200).json({ message: "게시물 추가 완료", char })
    } catch (error) {
        res.status(500).json({ message: "게시물 추가 실패", error })
    }
})

router.put('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)

        const index = findIndexId(charId)


        if (index === -1) {
            return res.status(404).json({ message: "게시글 없음" })
        }
        const updateData = req.body

        char[index] = {
            ...char[index],
            ...updateData
        }

        res.status(200).json({ message: "게시물 수정 완료", character: char[index] })
    } catch (error) {
        res.status(500).json({ message: "게시물 수정 실패", error })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)

        const index = findIndexId(charId)


        if (index === -1) {
            return res.status(404).json({ message: "게시글 없음" })
        }

        char.splice(index, 1)

        res.status(200).json({ message: "게시물 삭제 완료", char })
    } catch (error) {
        res.status(500).json({ message: "게시물 삭제 실패", error })
    }
})



module.exports = router