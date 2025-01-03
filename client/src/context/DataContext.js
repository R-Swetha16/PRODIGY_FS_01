import React, { createContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom';

const DataContext=createContext({});
export const DataProvider = ({children}) => {
  // const navigate=useNavigate(" ");
    const [toggleAddDeck, setToggleAddDeck] = useState(true);
    const [userName, setUserName] = useState(() => sessionStorage.getItem('userName') || 'Swetha');
    const [userEmail, setUserEmail] = useState(() => sessionStorage.getItem('userEmail') || '');
    const [password, setPassword] = useState(() => sessionStorage.getItem('password') || '');
    const [deckAdded, setDeckAdded] = useState(false);
    const[emailError,setEmailError]=useState(false);
    const[passwordError,setPasswordError]=useState(false);
    const [userId, setUserId] = useState('');
    const [cardNo, setCardNo] = useState(() => sessionStorage.getItem('cardNo') || null);
    const [deckNo, setDeckNo] = useState(() => sessionStorage.getItem('deckNo') || null);
    const [decks,setDecks] = useState([]);
    const [cards,setCards] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [showAlert, setShowAlert] = useState(false);
    // useEffect(()=>{
    //   const fetchDetails=async()=>{
    //     const id=sessionStorage.getItem('userId');
    //   if(id)
    //   {
    //     setUserId(id);
    //     navigate('/home');
    //   }
    //   else{
    //     navigate('/');
    //   }
    //   }
    //   (async () => await fetchDetails())();
    // },[]);
  return (
    <DataContext.Provider
    value={{
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userId,
        setUserId,
        cardNo, 
        setCardNo,
        deckNo, 
        setDeckNo,
        deckAdded,
        setDeckAdded,
        decks,
        setDecks,
        cards,
        setCards,
        toggleAddDeck,
        setToggleAddDeck,
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        password,
        setPassword,
        alertMessage,
        setAlertMessage,
        alertSeverity,
        setAlertSeverity,
        showAlert,
        setShowAlert
    }}
    >{children}
        </DataContext.Provider>
  )
}

export default DataContext