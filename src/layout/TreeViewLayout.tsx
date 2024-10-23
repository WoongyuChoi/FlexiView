import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useState } from "react";
import { Menu } from "../data/MenuConstant";
import { convertToTreeItems } from "../utils/MenuUtils";

interface TreeViewLayoutProps {
  apiRef: any;
}

const TreeViewLayout = ({ apiRef }: TreeViewLayoutProps) => {
  const [lastClickedItem, setLastClickedItem] = useState<string | null>(null);

  // Menu 데이터를 Tree 구조로 변환
  const menuTreeItems = convertToTreeItems();

  const isItemDisabled = (item: TreeViewBaseItem) => {
    const menuItem = Menu.find((menu) => menu.mid === item.id);
    return menuItem?.misUse === "N"; // misUse가 "N"이면 비활성화
  };

  const handleSelectedItemsChange = (
    event: React.SyntheticEvent,
    itemId: string | null
  ) => {
    if (itemId != null) {
      setLastClickedItem(apiRef.current!.getItem(itemId)?.id ?? "Unknown");
    } else {
      setLastClickedItem(null);
    }
  };

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
          apiRef={apiRef}
          // onItemClick={(event, itemId) => setLastClickedItem(itemId)}
          isItemDisabled={isItemDisabled}
          onSelectedItemsChange={handleSelectedItemsChange}
        />
      </Box>
    </Stack>
  );
};

export default TreeViewLayout;
