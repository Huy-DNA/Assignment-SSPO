import React from 'react';
import UserGrid from "../../components/UserGrid/UserGrid";

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        QUẢN LÍ TÀI KHOẢN
      </h1>
      <UserGrid />
    </div>
  );
}