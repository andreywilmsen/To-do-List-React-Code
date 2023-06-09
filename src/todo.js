import React, {useState, useEffect} from 'react'
import TodoForm from './components/todoform'
import Item from './components/item'
import List from './components/list'
import Modal from './components/modal'
import './todo.css'

const SAVED_ITEMS = "savedItems"

function Todo(){

    const[showModal,setShowModal] = useState(false);

    const [items, setItems] = useState([]);

   useEffect(()=>{
    let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));
    if(savedItems!=""){
        console.log(savedItems);
        console.log('true')
        setItems(savedItems)
    }
   },[])

   useEffect( () => {
    localStorage.setItem(SAVED_ITEMS, JSON.stringify(items))
   }, [items])

    function onAddItem(text){
        let it = new Item(text);
        setItems([...items,it])
        onHideModal();
    }

    function onDone(item){
        let updatedItems = items.map(it=>{
            if(it.id === item.id){
                it.done = !it.done;
            }
            return it
        })
        setItems(updatedItems);
    }

    function onItemDeleted(item){
        let filteredItems = items.filter(it=>it.id !==item.id);
        setItems(filteredItems);
    }

    function onHideModal(e){
            setShowModal(false);

    }

    return(
        <div className="container">
           <header className="header"> <h1>To do List - Desenvolvido por Andrey Wilmsen</h1> <button onClick={()=>{setShowModal(true)}}className="addButton">+</button></header>
        <List onDone={onDone} onItemDeleted={onItemDeleted} items={items}></List>
        <Modal show={showModal} onHideModal={onHideModal}><TodoForm onAddItem={onAddItem}></TodoForm></Modal>
        </div>
    )
}



export default Todo;