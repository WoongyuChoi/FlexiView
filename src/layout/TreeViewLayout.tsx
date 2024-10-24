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
  const [lastClickedItem, setLastClickedItem] = useState<string[] | null>([]);
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
    <Stack sx={{ backgroundColor: "#fad0a1", maxHeight: "140px" }}>
      <Box
        sx={{
          textAlign: "center",
          overflowX: "auto", // 가로 스크롤 추가
          overflowY: "hidden",
          whiteSpace: "nowrap", // 텍스트가 한 줄로 표시되도록 설정
          display: "block", // 박스의 높이를 유지
          padding: 2,
          minHeight: "10vh",
        }}
      >
        <Typography>
          {lastClickedItem == null || lastClickedItem.length == 0
            ? "No item click recorded"
            : `Last clicked item: ${lastClickedItem}`}
        </Typography>
      </Box>

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
          multiSelect // 다중 선택 활성화
          checkboxSelection // 체크박스 선택 활성화
          // onItemClick={(event, itemId) => setLastClickedItem(itemId)}
          isItemDisabled={isItemDisabled}
          onSelectedItemsChange={(event, itemIds) => {
            const lastItemId = Array.isArray(itemIds) ? itemIds[0] : itemIds; // 최근 항목 선택
            setLastClickedItem(itemIds);
            onSelectedItemsChange(event, lastItemId);
          }}
        />
      </Box>
    </Stack>
  );
};

export default TreeViewLayout;
