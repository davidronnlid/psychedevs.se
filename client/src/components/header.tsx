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
      <HideOnScroll {...props}>
        <AppBar className={styles.header}>
          <Grid container>
            <Grid item xs={8}>
              <h1>PsycheDevs</h1>
            </Grid>
            <Grid item xs={3}>
              <TiShoppingCart />: {totalCartPrice}kr
              <StripeCheckout btnText="Gå till kassan" />
            </Grid>
          </Grid>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
