import {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import './index.css'

const ListItem = props => {
  const {id, name, count, onDelete, onUpdate, onEdit} = props
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditValue] = useState(name)

  const handleEditChange = e => {
    console.log('New edit value:', e.target.value)
    setEditValue(e.target.value)
  }

  const handleEditSubmit = () => {
    console.log('Submitting edited value:', editValue)
    onEdit(id, editValue) // Pass the task id and the updated name to the editTask function
    onUpdate(id)
    setEditMode(false)
  }

  const onClickDelete = () => {
    onDelete(id)
  }

  return (
    <li className='li'>
      {editMode ? (
        <>
          <input type='text' value={editValue} onChange={handleEditChange} />
          <button type='button' onClick={handleEditSubmit}>
            Save
          </button>
        </>
      ) : (
        <>
          <p>
            {name} <span>(changed {count} times)</span>
          </p>
          <button type='button' onClick={() => setEditMode(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button type='button' onClick={() => onClickDelete(id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </li>
  )
}
export default ListItem
