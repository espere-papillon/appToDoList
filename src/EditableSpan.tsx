import React, {KeyboardEvent, ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    // const [error, setError] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        // const trimmedTitle = title.trim()
        // if (trimmedTitle) {
            props.changeTitle(title)
        // } else {
        //     setError(true)
        // }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode ? <input value={title} autoFocus={true} onBlur={offEditMode} onChange={changeTitle}/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}