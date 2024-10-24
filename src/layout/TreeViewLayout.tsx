import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useEffect, useState } from "react";
import { Menu, MenuItem } from "../data/MenuConstant";
import { convertMenuToTreeItems, convertToTreeItems } from "../utils/MenuUtils";

interface TreeViewLayoutProps {
  apiRef: any;
  onSelectedItemsChange: (
    event: React.SyntheticEvent,
    itemId: string | null
  ) => void;
  menuData: MenuItem[];
}

const TreeViewLayout = ({
  apiRef,
  onSelectedItemsChange,
  menuData,
}: TreeViewLayoutProps) => {
  const [lastClickedItem, setLastClickedItem] = useState<string | null>(null);
  const [menuTreeItems, setMenuTreeItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useEffect(() => {
    const newTreeItems = convertMenuToTreeItems(menuData);
    setMenuTreeItems(newTreeItems);

    // 모든 항목을 확장 상태로 설정
    const allItemIds = menuData.map((item) => item.mid || "");
    setExpandedItems(allItemIds);
  }, [menuData]);

  const isItemDisabled = (item: TreeViewBaseItem) => {
    const menuItem = menuData.find((menu) => menu.mid === item.id);
    return menuItem?.misUse === "N"; // misUse가 "N"이면 비활성화
  };

  const handleExpandClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.checked;
    setIsExpanded(newState);
    
    if (newState) {
      const allItemIds = menuData.map((item) => item.mid || "");
      setExpandedItems(allItemIds);
    } else {
      setExpandedItems([]);
    }
  };

  return (
    <Stack sx={{ backgroundColor: "#fad0a1", maxHeight: "100px" }}>
      <Typography sx={{ textAlign: "center", padding: 2 }}>
        {lastClickedItem == null
          ? "No item click recorded"
          : `Last clicked item: ${lastClickedItem}`}
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <Typography component="div">
          <Switch
            checked={isExpanded}
            onChange={handleExpandClick}
            inputProps={{ "aria-label": "controlled" }}
          />
          {isExpanded ? "Expand all" : "Collapse all"}
        </Typography>
      </Box>

      <Box
        sx={{
          minHeight: "80vh",
          minWidth: 250,
          backgroundColor: "#f5f5f5",
          padding: 2,
          overflowY: "auto",
        }}
      >
        <RichTreeView
          items={menuTreeItems}
          apiRef={apiRef}
          expandedItems={expandedItems}
          onExpandedItemsChange={(event, itemIds) => {
            setExpandedItems(itemIds);
          }}
          // onItemClick={(event, itemId) => setLastClickedItem(itemId)}
          isItemDisabled={isItemDisabled}
          onSelectedItemsChange={(event, itemId) => {
            setLastClickedItem(itemId);
            onSelectedItemsChange(event, itemId);
          }}
        />
      </Box>
    </Stack>
  );
};

export default TreeViewLayout;
