import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

export const useGetUsers = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        let url = BASE_URL + "users/";

        const res = await axios.get(url, {
          headers: { token: localStorage.getItem("token") },
        });
        if (res.data) {
          setUsers(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUsersData();
  }, []);

  return { users };
};
