import { useEffect, useState } from "react";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import Button from "./Button";

const FlashCardForm = ({createMode = true, onPersist = null, children: flashCard = null,}) => {

    const [title, setTitle] = useState(flashCard?.title || '');
    const [description, setDescription] = useState(flashCard?.description || '');

    useEffect(()=>{
        if(createMode){
            setDescription('');
            setTitle('');
        }
    }, [createMode])

    const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';

    function handleInputChange(title){
        setTitle(title);
    }

    function handleTextAreaChange(description){
        setDescription(description);
    }

    function handleFormSubmit (e){
        e.preventDefault()

        if(onPersist){
            onPersist(title, description);
            handleForReset ()
        }
    }

    function handleForReset (){
        setTitle('');
        setDescription('');
    }

    return ( 
            <form className={`${backgroundClassName} p-4`} onSubmit={handleFormSubmit} onReset={handleForReset}>
                <h2 className="text-center font-semibold">Manutenção de FleshCards</h2>
                <TextInput labelDescription="Título:" inputValue={title} onInputChange={handleInputChange}/>
                <TextArea labelDescription="Descrição: " textAreaValue={description} onTextAreaChange={handleTextAreaChange}/>

                <div className="flex items-center justify-end">
                    <Button colorClass="bg-red-200" type="reset">Limpar</Button>
                    <Button colorClass="bg-green-300" type='submit'>Salvar</Button>
                </div>
            </form>  
              
     );
}
 
export default FlashCardForm ;