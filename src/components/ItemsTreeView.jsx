import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

const ItemsTreeView = () => {
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        <TreeItem itemId="grid" label="Data Grid">
          <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
          <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
          <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
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
