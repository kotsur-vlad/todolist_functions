import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {IconButton, TextField} from "@material-ui/core"
import {AddBox} from "@material-ui/icons"

type PropsType = {
	addItem: (itemTitle: string) => void
}

export const AddItemForm = React.memo((props: PropsType) => {
	console.log("AddItemForm was called")

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
		if (error !== null) {
			setError(null)
		}
		if (e.charCode === 13) {
			onAddItemHandler()
		}
	}
	const onLostInputTitleFocus = () => {
		setError(null)
	}

	return (
		<div>
			<TextField value={newItemTitle}
					   onChange={onNewItemTitleChangeHandler}
					   onKeyPress={onKeyPressHandler}
					   onBlur={onLostInputTitleFocus}
					   variant="outlined"
					   label="Title"
					   error={!!error}
					   helperText={error}
			/>
			<IconButton onClick={onAddItemHandler}
						color="primary">
				<AddBox/>
			</IconButton>
		</div>
	)
})
