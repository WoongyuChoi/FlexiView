import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useEffect, useState, useRef } from "react";
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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const toggledItemRef = useRef<{ [itemId: string]: boolean }>({});

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

  const handleItemClick = (event: React.SyntheticEvent, itemId: string) => {
    if (!selectedItems.includes(itemId)) {
      handleSelectedItemsChange(event, [...selectedItems, itemId]);
    } else {
      handleSelectedItemsChange(
        event,
        selectedItems.filter((id) => id !== itemId)
      );
    }
  };

  const handleSelectedItemsChange = (
    event: React.SyntheticEvent,
    newSelectedItems: string[]
  ) => {
    // 부모 항목 선택 시 자식 항목 선택/해제
    const itemsToSelect: string[] = [];
    const itemsToUnSelect: { [itemId: string]: boolean } = {};
    Object.entries(toggledItemRef.current).forEach(([itemId, isSelected]) => {
      const item = apiRef.current!.getItem(itemId);
      if (isSelected) {
        itemsToSelect.push(...getItemDescendantsIds(item));
      } else {
        getItemDescendantsIds(item).forEach((descendantId) => {
          itemsToUnSelect[descendantId] = true;
        });
      }
    });

    const newSelectedItemsWithChildren = Array.from(
      new Set(
        [...newSelectedItems, ...itemsToSelect].filter(
          (itemId) => !itemsToUnSelect[itemId]
        )
      )
    );

    setSelectedItems(newSelectedItemsWithChildren);
    toggledItemRef.current = {};

    const lastItemId = Array.isArray(newSelectedItemsWithChildren)
      ? newSelectedItemsWithChildren[newSelectedItemsWithChildren.length - 1]
      : newSelectedItemsWithChildren;
    setLastClickedItem(newSelectedItemsWithChildren);

    // 상위 컴포넌트에 마지막 선택된 항목 전달
    onSelectedItemsChange(event, lastItemId);
  };

  const getItemDescendantsIds = (item: TreeViewBaseItem): string[] => {
    const ids: string[] = [];
    item.children?.forEach((child) => {
      ids.push(child.id);
      ids.push(...getItemDescendantsIds(child));
    });
    return ids;
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
    <Box
      sx={{
        width: "350px",
        borderRight: "1px solid #ddd",
        textAlign: "left",
      }}
    >
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
            minHeight: "70vh",
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
            onItemClick={handleItemClick} // 라벨 클릭 시에도 선택 가능하도록 처리
            isItemDisabled={isItemDisabled}
            selectedItems={selectedItems}
            onSelectedItemsChange={handleSelectedItemsChange}
            onItemSelectionToggle={(event, itemId, isSelected) => {
              toggledItemRef.current[itemId] = isSelected;
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default TreeViewLayout;
