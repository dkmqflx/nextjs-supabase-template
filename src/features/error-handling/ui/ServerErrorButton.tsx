"use client";

import { Button } from "@/shared/ui/button";
import { useRequestServerError } from "../api/error-handling-query";

const ServerErrorButton = () => {
  const { mutate } = useRequestServerError();
  return <Button onClick={() => mutate()}>ServerErrorButton</Button>;
};

export default ServerErrorButton;
