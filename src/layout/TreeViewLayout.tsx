import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useState } from "react";
import { convertToTreeItems } from "../utils/MenuUtils";

const TreeViewLayout = () => {
  const [lastClickedItem, setLastClickedItem] = useState<string | null>(null);

  // Menu 데이터를 Tree 구조로 변환
  const menuTreeItems = convertToTreeItems();

  return (
    <Stack sx={{ backgroundColor: "#fad0a1" }}>
      <Typography sx={{ textAlign: "center", padding: 2 }}>
        {lastClickedItem == null
          ? "No item click recorded"
          : `Last clicked item: ${lastClickedItem}`}
      </Typography>
      <Box
        sx={{
          minHeight: "100vh",
          minWidth: 250,
          backgroundColor: "#f5f5f5",
          padding: 2,
        }}
      >
        <RichTreeView
          items={menuTreeItems}
          onItemClick={(event, itemId) => setLastClickedItem(itemId)}
        />
      </Box>
    </Stack>
  );
};

export default TreeViewLayout;
