import * as React from "react";
import AppBar from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { useAppSelector } from "../redux/hooks";
import { selectTotalCartPrice } from "../redux/cartPricesSlice";
import { TiShoppingCart } from "react-icons/ti";

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
        <AppBar>
          DRWebsites
          <h3>
            <TiShoppingCart />: {totalCartPrice}kr
          </h3>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
