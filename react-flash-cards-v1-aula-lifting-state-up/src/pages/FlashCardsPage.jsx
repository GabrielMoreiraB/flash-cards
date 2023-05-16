import { useEffect, useState } from 'react';
import Button from '../components/Button';
import FlashCard from '../components/FlashCard';
import FlashCards from '../components/FlashCards';
import Header from '../components/Header';
import Main from '../components/Main';
import RadioButton from '../components/RadioButton';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import { apiGetAllFlashCards } from '../services/apiService';
import { ClipLoader } from "react-spinners";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FlashCardItem from '../components/FlashCardItem';
import FlashCardForm from '../components/FlashCardForm';
import { getNewId } from '../services/idService';



export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFashCard, setSelectedFashCard] = useState(null);

  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    /* apiGetAllFlashCards().then(allFlashCards => {setAllCards(allFlashCards);}) */

    async function getAllCards(){
      try{
        const backEndAllCards = await apiGetAllFlashCards();
      setAllCards(backEndAllCards)
      setTimeout(()=> {setLoading(false);},500)
      } catch(error){
        setError(error.message);
      }
      
      
    }

    getAllCards()
  },[])

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(studyCards);

    setStudyCards(shuffledCards);
  }

  useEffect(() => {
    setStudyCards(allCards.map(card =>({... card, showTitle:true})))
  }, [allCards])

  function handleRadioShowDescriptionClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: false}));

      setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: true}));

      setStudyCards(updatedCards);

    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

    setStudyCards(updatedCards);
  }

  function handleDeleteFlashCard(cardId){

    
    setAllCards(allCards.filter(card => card.id !== cardId))
  }

  function handleEditFlashCard(card){
    setCreateMode(false)
    setSelectedTab(1)
    setSelectedFashCard(card)
  }

  function handleTabSelect(tabIndex){
    setSelectedTab(tabIndex);
  }

  function handleNewFlashCard(){
    setCreateMode(true)
    setSelectedFashCard(null)
  }

  function handlePersist(title, description){
    if(createMode){
      setAllCards([...allCards, {id:  getNewId(), title, description}])
    } else{
      {setAllCards(allCards.map(card => {
        if(card.id === selectedFashCard.id){
          return {...card, title, description};
        }
        return card;
      }))
      setSelectedFashCard(null)
      setCreateMode(true)
    }
    }
  }

  let mainJsx = (<div className='flex justify-center my-4'>
  <ClipLoader/>
  </div>)

  if(error){
    mainJsx = <p>{error}</p>
  }

  if(!loading){
    mainJsx = <>

    <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
        <TabList>
          <Tab>Listagem</Tab>
          <Tab>Cadastro</Tab>
          <Tab>Estudo</Tab>
        </TabList>

        <TabPanel>
          {allCards.map(flashcard=>
          <FlashCardItem 
          key={flashcard.id} 
          onDelete ={handleDeleteFlashCard}
          onEdit ={handleEditFlashCard}
          >
            {flashcard}</FlashCardItem>)}
        </TabPanel>

        <TabPanel>
          <div className='my-4'><Button onButtonClick={handleNewFlashCard}>Novo FlashCard</Button></div>
          
          <FlashCardForm createMode={createMode} onPersist={handlePersist}>{selectedFashCard}</FlashCardForm>
        </TabPanel>

        <TabPanel>
        <div className="text-center mb-4">
          <Button onButtonClick={handleButtonClick}>Embaralhar cards</Button>
        </div>

        <div className="flex flex-row items-center justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={radioButtonShowTitle}
            onButtonClick={handleRadioShowTitleClick}
          >
            Mostrar título
          </RadioButton>

          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            buttonChecked={!radioButtonShowTitle}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Mostrar descrição
          </RadioButton>
        </div>

        <FlashCards>
          {studyCards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
                onToggleFlashCard={handleToggleFlashCard}
              />
            );
          })}
        </FlashCards>
        </TabPanel>
      </Tabs>

    
    </>
  }

  return (
    <>
      <Header>React Flash Cards</Header>  
      <Main>{mainJsx}</Main>
    </>
  );
}
