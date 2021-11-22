const { Router } = require('express');
const Elem = require('../models/Elem');
const router = Router();

router.post(
    "/save",
    async (req, res) => {
        try {
            const { elems } = req.body;

            for (let i = 0; i < elems.length; i++) {
                console.log(elems[i]);
                const elem = new Elem({
                    id: elems[i].id,
                    name: elems[i].name,
                    childs: elems[i].childs,
                    parent: elems[i].parent,
                    edit: elems[i].edit,
                })
                console.log(elem);
                await elem.save();
            }

            res.status(201).json({ message: "Список сохранен" });
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, поробуйте снова" })
        }
    });

module.exports = router;