import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({ items, isLoading, searchValue, onChangeSearchValue, invited, addInInvited, onSendInvites, count }) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input type="text" onChange={onChangeSearchValue} value={searchValue} placeholder="Найти пользователя..." />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {
            items.filter(item => {

              const full_name = (item.first_name + item.last_name).toLowerCase()
              return (
                full_name.includes(searchValue.toLowerCase()) || 
                item.email.includes(searchValue.toLowerCase())
              )    
              
            }).map(item => <User 
              userInfo={item} 
              key={Math.random()}
              invited={invited}
              addInInvited={addInInvited}
              isInvited={invited.includes(item.id)}
              /> )
          }
        </ul>
      )}
      <button className="send-invite-btn" disabled={count === 0 ? true : false} onClick={onSendInvites}>Отправить приглашение</button>
    </>
  );
};
