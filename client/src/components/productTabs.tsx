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

  return (
    <Box className={styles.containerBox}>
      <h3>Products and Services offered by David</h3>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="product tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {products.map((product) => (
            <Tab label={product.title} {...a11yProps(product.id)} />
          ))}
          <Tab label="More" {...a11yProps(products.length)} />
        </Tabs>
      </Box>

      {products.map((product) => (
        <TabPanel value={value} index={product.id}>
          <Product product={product} />
        </TabPanel>
      ))}

      <TabPanel value={value} index={products.length}>
        <h2>David is open to remote part-time freelance work</h2>
        <a href="https://linkedin.com/in/davidronnlid/">
          Contact David via LinkedIn
        </a>
      </TabPanel>
    </Box>
  );
}
