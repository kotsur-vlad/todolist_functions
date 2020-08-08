import React, {ChangeEvent, useState} from "react"
import {TextField} from "@material-ui/core"

type PropsType = {
	value: string
	getNewValue: (newValue: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
	console.log("Editable")
	const [editMode, setEditMode] = useState(false)
	const [value, setValue] = useState("")

	const activateEditMode = () => {
		setEditMode(true)
		setValue(props.value)
	}
	const activateViewMode = () => {
		setEditMode(false)
		props.getNewValue(value)
	}

	const changeValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

	return (
		editMode
			? <TextField value={value}
						 onBlur={activateViewMode}
						 onChange={changeValue}
						 autoFocus
						 variant="outlined"
			/>
			: <span onDoubleClick={activateEditMode}>{props.value}</span>
	)
})
