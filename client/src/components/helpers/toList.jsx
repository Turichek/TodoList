import { addElemAction, removeElemAction, updateElemAction, updateElemsAction } from "../../store/List/actions";
import { openCloseAlertAction } from "../../store/Alert/actions";
import { openCloseModalAction } from "../../store/Modal/actions";

const delay = 200;
let timer = 0;
let prevent = false; // eslint-disable-line

export const addElemToList = (values, parent, dispatch, e = null) => {
    if (values.name.value !== '') {
        let elem = {
            id: Date.now() + getRandomInt(1000),
            name: values.name.value,
            childs: false,
            parent: parent,
            edit: false,
        }

        dispatch(addElemAction(elem));
        dispatch(openCloseModalAction({ open: false, text: '', parent: -1 }));
        dispatch(openCloseAlertAction({ open: true, text: 'Элемент добавлен в список', severity: 'success' }));
    }
    else {
        dispatch(openCloseAlertAction({ open: true, text: 'Не корректное имя элемента', severity: 'error' }));
    }

    if (e !== null) {
        e.stopPropagation();
    }
}

export const editAttributes = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        delete arr[i]._id;
        delete arr[i].__v;
        if (arr[i].childs) {
            arr[i].openChilds = false;
        }
    }
}

export const updateElemName = (elem, dispatch, date) => {
    elem.name = Date.parse(date.toString());
    dispatch(updateElemAction(elem));
}

export const addSublist = (elem, dispath) => {
    elem.childs = true;
    dispath(updateElemAction(elem));
}

export const deleteSublist = (elem, dispath, list) => {
    elem.childs = false;
    deleteChilds(elem, dispath, list);
    dispath(updateElemAction(elem));
}

export const removeElem = (elem, dispath, list) => {
    if (elem.childs === true) {
        deleteChilds(elem, dispath, list);
    }
    dispath(removeElemAction(elem.id));
}

export const openEditorElem = (e, elem, dispath, list) => {
    if (list.editable !== false) {
        clearTimeout(timer);
        prevent = true;

        elem.edit = true;
        dispath(updateElemAction(elem));

        setTimeout(() => {
            prevent = false;
        }, delay);
        e.stopPropagation();
    }
}

const findList = (elem, list) => {
    const arrSublists = findChilds(list);
    let toReturn = null;
    arrSublists.forEach(item => {
        if (item.includes(elem)) {
            toReturn = item;
        }
    })
    return toReturn;
}

const findIndexElem = (elem, list) => {
    return list.indexOf(elem);
}

export const UpElem = (e, elem, dispatch, list) => {
    const listWereElem = findList(elem, list);
    const prevElem = listWereElem[findIndexElem(elem, listWereElem) - 1];
    if (prevElem === undefined) {
        dispatch(openCloseAlertAction({ open: true, text: "Это первый элемент списка", severity: 'info' }));
        return;
    }

    const indexElem = findIndexElem(elem, list.elems);
    const indexPrevElem = findIndexElem(prevElem, list.elems);
    [list.elems[indexElem], list.elems[indexPrevElem]] = [list.elems[indexPrevElem], list.elems[indexElem]];

    console.log(list.elems);
    dispatch(updateElemsAction(list.elems));
    e.stopPropagation();
}

export const DownElem = (e, elem, dispatch, list) => {
    const listWereElem = findList(elem, list);
    const prevElem = listWereElem[findIndexElem(elem, listWereElem) + 1];
    if (prevElem === undefined) {
        dispatch(openCloseAlertAction({ open: true, text: "Это последний элемент списка", severity: 'info' }));
        return;
    }

    const indexElem = findIndexElem(elem, list.elems);
    const indexPrevElem = findIndexElem(prevElem, list.elems);
    [list.elems[indexElem], list.elems[indexPrevElem]] = [list.elems[indexPrevElem], list.elems[indexElem]];

    console.log(list.elems);
    dispatch(updateElemsAction(list.elems));
    e.stopPropagation();
}

export const findChilds = (list) => {
    let arr = [];
    let arrList = [];
    let arrSublist = [];

    list.elems.forEach(item => {
        if (item.parent === list.id) {
            arrList.push(item);
        }

        if (item.childs === true) {
            list.elems.forEach(elem => {
                if (elem.parent === item.id) {
                    arrSublist.push(elem);
                }
            })
            arr.push(arrSublist);
            arrSublist = [];
        }
    })
    arr.push(arrList);

    console.log(arr);
    return arr;
}

export const editElem = (e, elem, dispath) => {
    if (e.keyCode === 13) {
        elem.edit = false;
    }
    elem.name = e.target.value;
    dispath(updateElemAction(elem));
}

function deleteChilds(parent, dispath, list) {
    list.map(item => { // eslint-disable-line
        if (item.parent === parent.id) {
            deleteChilds(item, dispath, list);
            dispath(removeElemAction(item.id));
        }
    })
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]