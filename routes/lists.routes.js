const { Router } = require('express');
const Elem = require('../models/Elem');
const router = Router();

router.post(
    "/saveAll",
    async (req, res) => {
        try {
            const { elems } = req.body;

            await Elem.deleteMany({});
            await Elem.insertMany(elems);
            // for (let i = 0; i < elems.length; i++) {
            //     console.log(elems[i]);
            //     const elem = new Elem({
            //         id: elems[i].id,
            //         name: elems[i].name,
            //         childs: elems[i].childs,
            //         parent: elems[i].parent,
            //         edit: elems[i].edit,
            //     })
            //     console.log(elem);
            //     await elem.save();
            // }

            res.status(201).json({ message: "Список сохранен" });
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, поробуйте снова" })
        }
    }
);

router.get(
    "/getAll",
    async (req, res) => {
        try {
            const result = await Elem.find();
            res.status(200).send(result);
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, поробуйте снова" })
        }
    }
);

router.get(
    "/getFirst",
    async (req, res) => {
        try {
            const result = await Elem.findOne();
            res.status(200).send(result);
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, поробуйте снова" })
        }
    }
);

router.post(
    "/getById",
    async (req, res) => {
        try {
            const {id} = req.body;
            const result = await Elem.find({ parent: id });
            res.status(200).send(result);
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, поробуйте снова" })
        }
    }
);

module.exports = router;