import {AiOutlineEdit as EditIcon, AiOutlineDelete as DeleteIcon} from 'react-icons/ai'

const FlashCardItem = ({children:flashcard, onDelete = null, onEdit = null}) => {

    const {title, description} = flashcard;

    function handleDeleteIconClick(){
        if (onDelete) onDelete(flashcard.id)
    }

    function handleEditIconClick(){
        if(onEdit){
            onEdit(flashcard);
        }
    }

    return ( 
        <div className="border p-2 m-2 ">
            <ul className="flex flex-col space-y-4">
                <li>Título: <strong>{title}</strong></li>
                <li>Descrição: <span>{description}</span></li>
            </ul>

            <div className='mt-4 flex flex-row items-center justify-end space-x-4 '>
                <EditIcon onClick={handleEditIconClick}  className='cursor-pointer' size={24}/> 
                <DeleteIcon onClick={handleDeleteIconClick}  className='cursor-pointer' size={24}/>
                </div>
        </div>
     );
}
 
export default FlashCardItem;