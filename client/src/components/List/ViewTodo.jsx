import React from "react";
import ViewItemsList from "./ViewItemsList";

export default function ViewTodo({ listId }) {
    return (
        <ViewItemsList parent={listId} />
    )
}