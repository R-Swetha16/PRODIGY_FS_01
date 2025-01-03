import { useState } from 'react';
export function useLocalVariable(){
    const [userName, setUserName] = useState('Swetha');
    const [userEmail,setUserEmail ] = useState('');
    const [userId, setUserId] = useState('');
    const [cardNo, setCardNo] = useState(0);
    const [deckNo, setDeckNo] = useState(0);

    return {
        cardNo,
        setCardNo,
        deckNo,
        setDeckNo,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userId,
        setUserId,
    };
}