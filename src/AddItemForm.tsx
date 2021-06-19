import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {RequestStatusType} from "./state/app-reducer";

export type AddItemFormPropsType = {
    addItem: (title: string) => void // родительский callback
    entityStatus: RequestStatusType
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title)
        } else {
            setError("Title is required")
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            addItem()
    }
    return (
        <div>
            <TextField variant={"outlined"} error={!!error}
                       helperText={error} value={title}
                       onChange={changeTitle} onKeyPress={onKeyPressAddItem}
            disabled={props.entityStatus === "loading"}/>
            <IconButton color={"primary"} onClick={addItem} disabled={props.entityStatus === "loading"}>
                <AddBox/>
            </IconButton>
        </div>
    )
})