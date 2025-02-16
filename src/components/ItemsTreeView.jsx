import { useContext } from "react";

import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { MenuItemContext } from "../context/contexts";

const ItemsTreeView = () => {
  const { popularItems } = useContext(MenuItemContext);

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        <TreeItem itemId="populars" label="Legnépszerűbb termékek">
          {popularItems.map((item, i) => (
            <TreeItem
              key={item.id}
              itemId={item.id}
              label={i + 1 + "# " + item.name}
            ></TreeItem>
          ))}
        </TreeItem>
        <TreeItem itemId="asd" label="Data Grid">
          <TreeItem itemId="asda" label="@mui/x-data-grid" />
          <TreeItem itemId="asb" label="@mui/x-data-grid-pro" />
          <TreeItem itemId="asc" label="@mui/x-data-grid-premium" />
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
};

export default ItemsTreeView;
