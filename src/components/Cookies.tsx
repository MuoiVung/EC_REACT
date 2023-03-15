import { Box, Button, TextField, Typography } from "@mui/material";
import React, { RefObject, useRef } from "react";

const setCookie = (
  name: string | number,
  value: string | number,
  expireDays?: string | number
) => {
  const date = new Date();

  let expires = "";

  if (expireDays && +expireDays > 0) {
    date.setTime(date.getTime() + +expireDays * 24 * 60 * 60 * 1000);
    expires = "expires=" + date.toUTCString();
  }

  let cookieStr = `${name}=${value}`;

  if (expires) {
    cookieStr += ";" + expires;
  }

  document.cookie = cookieStr;
};

const Cookies = () => {
  const cookieNameRef: RefObject<HTMLInputElement> = useRef(null);
  const cookieValueRef: RefObject<HTMLInputElement> = useRef(null);
  const cookieExpireDaysRef: RefObject<HTMLInputElement> = useRef(null);

  const handleSetCookie = () => {
    const cookieName = cookieNameRef.current?.value;
    const cookieValue = cookieValueRef.current?.value;
    const cookieExpireDays = cookieExpireDaysRef.current?.value;

    if (!cookieName || !cookieValue) {
      alert("Invalid Cookie Input");
      return;
    }

    // nếu chỉ truyền 2 tham số thì expires sẽ là session => tắt trình duyệt thì sẽ mất, tắt mỗi tab thì sẽ không mất
    setCookie(cookieName, cookieValue, cookieExpireDays);
  };

  // nếu truyền vào thời gian trước thời gian cookie này được tạo thì sẽ xoá cookie
  const handleRemoveCookie = () => {
    const cookieName = cookieNameRef.current?.value;

    if (!cookieName) {
      return;
    }

    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  };

  const handleGetCookie = () => {
    console.log(document.cookie);
  };

  const getCookieByName = (cookieName: string) => {
    const name = cookieName + "=";
    const ca = document.cookie.split(";");

    for (var i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const handleGetCookieByName = () => {
    const cookieName = cookieNameRef.current?.value;

    if (!cookieName) {
      return;
    }

    console.log(getCookieByName(cookieName));
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box>
        <Box my={"12px"}>
          <Typography variant="h4">Add Cookie</Typography>
          <TextField required label="Cookie Name" inputRef={cookieNameRef} />
          <TextField required label="Cookie Value" inputRef={cookieValueRef} />
          <TextField
            type="number"
            label="Expire Days"
            inputRef={cookieExpireDaysRef}
          />
        </Box>
        <Button variant="contained" onClick={handleSetCookie}>
          Set Cookie
        </Button>
        <Button
          sx={{ ml: "12px" }}
          variant="contained"
          onClick={handleRemoveCookie}
        >
          Remove Cookie
        </Button>
        <Button
          sx={{ ml: "12px" }}
          variant="contained"
          onClick={handleGetCookie}
        >
          Get Cookie
        </Button>
        <Button
          sx={{ ml: "12px" }}
          variant="contained"
          onClick={handleGetCookieByName}
        >
          Get Cookie By Name
        </Button>
      </Box>
    </Box>
  );
};

export default Cookies;
