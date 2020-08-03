import React, {ChangeEvent, useState} from "react"

type PropsType = {
	value: string
	getNewValue: (newValue: string) => void
}

function EditableSpan (props: PropsType) {

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
		? <input value={value}
				 onBlur={activateViewMode}
				 onChange={changeValue}
				 autoFocus/>
		: <span onDoubleClick={activateEditMode}>{props.value}</span>
	)
}

export default EditableSpan