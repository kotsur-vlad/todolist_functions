import React, {ChangeEvent, KeyboardEvent, useState} from "react"

type PropsType = {
	addItem: (itemTitle: string) => void
}

function AddItemForm (props: PropsType) {
	const [error, setError] = useState<string | null>(null)
	const [newItemTitle, setNewItemTitle] = useState("")
	const onAddItemHandler = () => {
		if (newItemTitle.trim() !== "") {
			props.addItem(newItemTitle)
			setNewItemTitle("")
		} else {
			setError("Title is required")
		}
	}
	const onNewItemTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewItemTitle(e.currentTarget.value)
	}
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			onAddItemHandler()
		}
	}
	const onLostInputTitleFocus = () => {
		setError(null)
	}

	return (
		<div>
			<input className={error ? "error" : ""}
				   value={newItemTitle}
				   onChange={onNewItemTitleChangeHandler}
				   onKeyPress={onKeyPressHandler}
				   onBlur={onLostInputTitleFocus}/>
			<button onClick={onAddItemHandler}>+</button>
			{error && <div className="error-message">{error}</div>}
		</div>
	)
}

export default AddItemForm