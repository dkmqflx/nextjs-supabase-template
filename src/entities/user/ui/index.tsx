'use client';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useCreateUser, useGetUser, useUpdateUser } from '../api/user-query';

const User = () => {
  const [searchInput, setSearchInput] = useState('');

  const { data } = useGetUser('');

  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();

  return (
    <div>
      <h1>User</h1>
      <Input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      <ul>
        {data.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
      <Button onClick={() => createUser(searchInput)}>Create</Button>
      <Button onClick={() => updateUser(searchInput)}>Update</Button>
    </div>
  );
};

export default User;
