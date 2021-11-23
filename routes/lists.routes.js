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

            res.status(201).json({ message: "Список сохранен" });
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, поробуйте снова" })
        }
    }
);

router.post(
    "/checkName",
    async (req, res) => {
        try {
            const {name} = req.body;
            const result = await Elem.findOne({name: name});
            console.log(result);
            if(result !== null){
                res.status(200).json({ message: "Такой элемент уже существует в списке", result });
            }
            else{
                res.status(200).json({ message: "Элемент добавлен в список", result });
            }
            
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