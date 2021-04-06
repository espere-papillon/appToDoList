import React, {KeyboardEvent, ChangeEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void // родительский callback
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
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
            <input
                className={error ? "error-input" : ""}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
            />
            <button className={"add-button"} onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}