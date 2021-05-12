import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan called')
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
        editMode ? <TextField color={"primary"} variant={"standard"} value={title} autoFocus={true} onBlur={offEditMode} onChange={changeTitle} />
            // <input value={title} autoFocus={true} onBlur={offEditMode} onChange={changeTitle}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})