import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([])
  const [invited, setInvited] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [success, setSuccess] = useState(false)


  useEffect(() => {
    fetch('https://reqres.in/api/users').then(res => res.json())
    .then(json => {
      setUsers(json.data)
    }).catch(err => {
      console.warn(err);
      alert('Ошибка при получении пользователей')
    }).finally( ()=> setIsLoading(false) )
  }, [])

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }
  const addInInvited = (id) => {
    if(invited.includes(id)) {
      setInvited(prev => prev.filter(_id => _id !== id))
    }else {
      setInvited(prev => [...prev, id])
    }
  }

  const onSendInvites = () => {
    setSuccess(true)
  }
  const turnBack = () => {
    setSuccess(false)
  }
  return (
    <div className="App">
      {
      success ? <Success turnBack={turnBack} count={invited.length}/> : 
        <Users 
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invited={invited}
          addInInvited={addInInvited}
          items={users} 
          isLoading={isLoading}
          onSendInvites={onSendInvites}
          count={invited.length}
        />
    }
    </div>
  );
}

export default App;
