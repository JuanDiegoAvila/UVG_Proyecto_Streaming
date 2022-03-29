import './TitleBar.css';

export default function TitleBar({name, subscription, setModal, search, setSearch}){
   
    const url = search ?  "/img/home.png" : "/img/search.png"

    return (
        <div className="title-bar">
           
           <h1>Proyecto Streaming</h1>

           <div className= "right-items">

            <button onClick={()=> {setSearch(!search)}}>
                <img src = {url}/>
            </button>

            <button onClick={()=> {setModal(true)}}>
                <img src ="/img/user.png"/>
            </button>

            <div className = 'user-info'>
                <h1>{name}</h1>
                <p>{subscription}</p>
            </div>

           </div>
           
        </div>
    )
}