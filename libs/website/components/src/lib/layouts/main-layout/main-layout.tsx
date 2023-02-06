import { FC, PropsWithChildren } from "react";
import { Footer } from "@lite/website-components";

import styles from "./main-layout.module.css";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles['container']}>
      {children}

      <Footer />
    </div>
  );
};
