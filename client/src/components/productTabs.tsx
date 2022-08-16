import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ProductProps } from "../types/ProductProps";
import Product from "./product";
import styles from "../css-modules/productTabs.module.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductTabs(props: { products: Array<ProductProps> }) {
  const products = props.products;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const handleStripeButtonClick = (event: React.SyntheticEvent, session: any) =>
  //   console.log(session);

  return (
    <Box className={styles.containerBox}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="product tabs"
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
        >
          <Tab label="PsycheDevs Podcast" {...a11yProps(0)} />
          {products.map((product) => (
            <Tab label={product.title} {...a11yProps(product.id)} />
          ))}{" "}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h2>
          Utveckla ditt psyke med vännerna Johan (psykologstudent) och David
          (läkarstudent)
        </h2>
        {/* <iframe
          width="100%"
          height="300"
          scrolling="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1481156176&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        ></iframe>
        <div
          style={{
            fontSize: "10px",
            color: "var(--secondary-color)",
            lineBreak: "anywhere",
            wordBreak: "normal",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontFamily:
              "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
            fontWeight: 100,
          }}
        >
          <a
            href="https://soundcloud.com/psychedevs"
            title="PsycheDevs"
            target="_blank"
            style={{ color: "var(--secondary-color)", textDecoration: "none" }}
          >
            PsycheDevs
          </a>{" "}
          ·{" "}
          <a
            href="https://soundcloud.com/psychedevs/sets/psychedevs-baesta"
            title="PsycheDevs bästa"
            target="_blank"
            style={{ color: "var(--secondary-color)", textDecoration: "none" }}
          >
            PsycheDevs Bästa
          </a>
        </div> */}

        <iframe
          src="https://www.youtube-nocookie.com/embed/60a7Ghv8qZQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.YTPlayer}
        />
      </TabPanel>
      {products.map((product) => (
        <TabPanel value={value} index={product.id + 1}>
          <Product product={product} />
        </TabPanel>
      ))}
    </Box>
  );
}
