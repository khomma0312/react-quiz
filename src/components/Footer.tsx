import { FC, ReactNode } from "react";

type FooterProps = {
  children: ReactNode;
};

export const Footer: FC<FooterProps> = ({children}) => {
  return (
    <footer>{children}</footer>
  )
};