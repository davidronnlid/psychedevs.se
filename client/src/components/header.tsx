import * as React from "react";
import AppBar from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { useAppSelector } from "../redux/hooks";
import { selectTotalCartPrice } from "../redux/cartPricesSlice";
import { TiShoppingCart } from "react-icons/ti";
import StripeCheckout from "./stripeCheckout";
import styles from "../css-modules/header.module.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import PsycheDevsLogoNoBg from "../images/PSYCHEDEVS_SE_NO_BG.png";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar(props: Props) {
  const totalCartPrice = useAppSelector(selectTotalCartPrice);

  return (
    <>
      <HideOnScroll>
        <AppBar
          className={styles.header}
          {...props}
          sx={{ background: "var(--tertiary-color)" }}
        >
          <div className={styles.flexContainer}>
            <div className={styles.flexItem}>
              <Link to="/" style={{ background: "var(--tertiary-color)" }}>
                <img
                  src={PsycheDevsLogoNoBg}
                  alt="PsycheDevs logo"
                  className={styles.logo}
                />
              </Link>
            </div>
            <div className={styles.flexItem}>
              <TiShoppingCart />: {totalCartPrice}kr
              <StripeCheckout btnText="Gå till kassan" />
            </div>
          </div>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
