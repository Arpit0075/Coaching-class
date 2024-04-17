import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

export const useGetClassDetails = () => {
  const [classInformation, setClassInformation] = useState(null);

  useEffect(() => {
    const getClassData = async () => {
      try {
        let url = BASE_URL + "classDetails/";

        const res = await axios.get(url, {
          headers: { token: localStorage.getItem("token") },
        });
        if (res.data) {
          setClassInformation(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getClassData();
  }, []);

  return { classInformation };
};
