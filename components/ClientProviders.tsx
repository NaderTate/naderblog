"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

type Props = { children: ReactNode };

const ClientProviders = ({ children }: Props) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default ClientProviders;
